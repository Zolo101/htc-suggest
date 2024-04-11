import { redirect } from "@sveltejs/kit";
import { redirectURL } from "$lib";

export const load = async ({locals}) => {
    const user = locals.pb.authStore.model;

    return {user};
}

// const login = async ({locals, cookies}) => {
//     const provider = (await locals.pb.collection('users').listAuthMethods()).authProviders.find((p: any) => p.name === 'google');
//     cookies.set('provider', JSON.stringify(provider), {httpOnly: true, path: `/auth/callback/google`});
//
//     throw redirect(303, provider.authUrl + env.REDIRECT_URL + provider.name);
// }