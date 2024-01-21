import { redirect, type RequestHandler } from "@sveltejs/kit";
import { requestTokenLogIn, setAccessToken, setRefreshToken } from "$lib/auth";
import { redirectURL, siteURL } from "$lib";

export const GET: RequestHandler = async ({url, cookies}) => {
    const code = url.searchParams.get("code") ?? ""
    if (code) {
        const tokenResponse = await requestTokenLogIn(code, redirectURL)
        if ("refresh_token" in tokenResponse) {
            setAccessToken(cookies, tokenResponse.access_token, tokenResponse.expires_in)
            setRefreshToken(cookies, tokenResponse.refresh_token)
        } else {
            return new Response(tokenResponse.error, {status: 400})
        }

    }

    throw redirect(308, "/")
}
