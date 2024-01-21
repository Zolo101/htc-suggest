import DiscordOauth2 from "$lib/DiscordOauth2";
import { refreshTokenRequest } from "$lib/auth";
import { redirect } from "@sveltejs/kit";
import { redirectURL } from "$lib";

export const load = async ({request, locals, cookies, fetch}) => {
    let user = locals.user;

    if (!user) {
        const refresh_token = cookies.get("refresh_token");

        if (refresh_token) {
            const result = await refreshTokenRequest(cookies, refresh_token)

            if (result) {
                user = await DiscordOauth2.getUser(result.access_token, fetch);
            }
        } else {
            // Attempt oauth login
            redirect(302, `https://canary.discord.com/api/oauth2/authorize?client_id=${import.meta.env.VITE_AUTH_CLIENT_ID}&redirect_uri=${redirectURL}&response_type=code&scope=identify`)
        }
    }

    return {user};
}