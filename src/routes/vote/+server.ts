import { error, type RequestHandler } from "@sveltejs/kit";
import type { DatabaseUser } from "$lib";

export const POST: RequestHandler = async ({url, locals}) => {
    const user = locals.pb.authStore.model as DatabaseUser;
    const id = url.searchParams.get("id");

    if (id === null) return error(400, "No suggestion id given")

    // Check if vote is in user's votes
    const alreadyVoted = user.votes
        .includes(id);

    if (alreadyVoted) {
        // Remove vote to user
        await locals.users.update(user.id, {
            "votes-": id
        })

        // Decrease vote in suggestion
        await locals.suggestions.update(id, {
            "votes-": 1,
        })
    } else {
        // Add vote to user
        await locals.users.update(user.id, {
            "votes+": id
        })

        // Increase vote in suggestion
        await locals.suggestions.update(id, {
            "votes+": 1,
        })
    }

    return new Response(null, {status: 200})
}