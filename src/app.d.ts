// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User } from "$lib/DiscordOauth2";
import type { DatabaseSuggestion } from "$lib";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User
		}
		interface PageData {
			user: User
			full: DatabaseSuggestion[]
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
