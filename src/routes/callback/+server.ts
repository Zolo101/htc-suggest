import { redirect, type RequestHandler } from "@sveltejs/kit";
import { redirectURL } from "$lib";

export const GET: RequestHandler = async ({locals, url, cookies}) => {
    const provider = JSON.parse(cookies.get("provider") || "{}")

    try {
        await locals.pb.collection("htc_users").authWithOAuth2Code(
            provider.name,
            url.searchParams.get("code") || "",
            provider.codeVerifier,
            redirectURL
        )
    } catch (e) {
        console.error(e)
        redirect(303, "/fail")
    }

    redirect(308, "/")
}
