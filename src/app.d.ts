// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { DatabaseSuggestion, DatabaseUser } from "$lib";
import Pocketbase, { RecordService } from "pocketbase";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: DatabaseUser
			pb: Pocketbase
			suggestions: RecordService<DatabaseSuggestion>
			users: RecordService<DatabaseUser>
		}
		interface PageData {
			user: DatabaseUser
			full: DatabaseSuggestion[]
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
