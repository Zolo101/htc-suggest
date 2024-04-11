export const load = async ({locals}) => {
    const user = locals.pb.authStore.model;

    return {user};
}