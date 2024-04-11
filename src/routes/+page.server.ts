export const load = async ({locals}) => {
    const full = await locals.suggestions.getFullList();

    return {full}
}