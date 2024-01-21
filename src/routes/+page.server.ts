import { suggestions } from "$lib/pocketbase";

export const load = async () => {
    const full = await suggestions.getFullList();

    return {full}
}
