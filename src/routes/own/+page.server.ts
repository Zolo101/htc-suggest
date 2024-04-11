import type { DatabaseUser } from "$lib";

export const load = async ({locals}) => {
    const user = locals.pb.authStore.model as DatabaseUser;
    // TODO: Give expansions a type
    const own = await locals.users.getOne(user.id, {expand: "suggestions"}) as any;

    return {own: own.expand.suggestions}
}