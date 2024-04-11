import { type Actions } from "@sveltejs/kit";
import type { DatabaseUser } from "$lib";

export const actions = {
    default: async ({request, locals }) => {
        // get form data
        const fd = await request.formData();
        const user = locals.pb.authStore.model as DatabaseUser;

        // Create suggestion
        const suggestion = await locals.suggestions.create({
            name: fd.get("name"),
            media: fd.get("media"),
            type: fd.get("type"),
            suggester: user.id,
            status: "",
            votes: 1 // See line 18
        })

        // Add suggestion to user
        // I'm assuming they want to vote on their suggestion as well
        await locals.users.update(user.id, {
            "suggestions+": suggestion.id,
            "votes+": suggestion.id
        })

        return {success: true}
    }
} satisfies Actions;