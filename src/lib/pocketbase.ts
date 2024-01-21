import Pocketbase from "pocketbase";
import type { DatabaseSuggestion } from "$lib/index";

// prod
export const pb = new Pocketbase("https://cdn.zelo.dev")
export const suggestions = pb.collection<DatabaseSuggestion>("htc_suggestions")
