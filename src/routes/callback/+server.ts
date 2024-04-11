import { redirect, type RequestHandler } from "@sveltejs/kit";
import { redirectURL } from "$lib";

// export const GET: RequestHandler = async ({locals, url, cookies}) => {
//     const code = url.searchParams.get("code") ?? ""
//     if (code) {
//         const tokenResponse = await requestTokenLogIn(code, redirectURL)
//         if ("refresh_token" in tokenResponse) {
//             setAccessToken(cookies, tokenResponse.access_token, tokenResponse.expires_in)
//             setRefreshToken(cookies, tokenResponse.refresh_token)
//         } else {
//             return new Response(tokenResponse.error, {status: 400})
//         }
//
//     }
//
//     throw redirect(308, "/")
// }

export const GET: RequestHandler = async ({locals, url, cookies}) => {
    const provider = JSON.parse(cookies.get("provider") || "{}")
    console.log(provider)
    console.log(url.searchParams)

    try {
        const response = await locals.pb.collection("htc_users").authWithOAuth2Code(
            provider.name,
            url.searchParams.get("code") || "",
            provider.codeVerifier,
            redirectURL
        )
        console.log("Response:", response)
    } catch (e) {
        console.error(e)
        throw redirect(303, "/fail")
    }

    throw redirect(308, "/")
}
