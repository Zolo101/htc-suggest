import { type Handle, redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import Pocketbase from "pocketbase";
import { type DatabaseSuggestion, type DatabaseUser, redirectURL } from "$lib";
import { dev } from "$app/environment";

export const authentication: Handle = async ({ event, resolve }) => {
    event.locals.pb = new Pocketbase("https://cdn.zelo.dev");
    event.locals.suggestions = event.locals.pb.collection<DatabaseSuggestion>("htc_suggestions");
    event.locals.users = event.locals.pb.collection<DatabaseUser>("htc_users");

    // load the store data from the request cookie string
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
    // console.log(event.request.headers.get('cookie'))
    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        event.locals.pb.authStore.isValid && await event.locals.pb.collection("htc_users").authRefresh();
    } catch {
        // clear the auth store on failed refresh
        event.locals.pb.authStore.clear();
    }

    const response = await resolve(event);

    // send back the default 'pb_auth' cookie to the client with the latest store state
    // From https://github.com/pocketbase/pocketbase/discussions/903 this apparently "may not be sufficient against CSRF attacks" although there is literally no other way to do this
    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({sameSite: "Lax", secure: !dev}));

    return response;
}

export const authorization: Handle = async ({ event, resolve }) => {
    // Protect any routes under /authenticated
    // console.log(event.locals.pb.authStore)
    const loggedIn = event.locals.pb.authStore.model;

    // Don't do this to the callback route to avoid infinite auth loops
    if (!loggedIn && event.url.pathname !== "/callback" && event.url.pathname !== "/fail") {
        // console.log("Creating provider!!")
        const provider = (await event.locals.pb.collection("htc_users").listAuthMethods()).authProviders.find(p => p.name === "discord");
        event.cookies.set("provider", JSON.stringify(provider), { httpOnly: true, path: "/callback" });

        // THIS WAS THE REASON WHY IT I KEPT GETTING "INVALID GRANT" DIDNT WORK OMG...
        // TODO: Figure out how to stop pocketbase from getting the email...
        // throw redirect(303, `https://canary.discord.com/api/oauth2/authorize?client_id=${import.meta.env.VITE_AUTH_CLIENT_ID}&redirect_uri=${redirectURL}&response_type=code&scope=identify+email`);
        throw redirect(303, provider!.authUrl + redirectURL)
    }

    // If the request is still here, just proceed as normally
    return resolve(event);
};

export const handle = sequence(authentication, authorization)
