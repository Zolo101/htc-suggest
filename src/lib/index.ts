import { type Writable, writable } from "svelte/store";
import { dev } from "$app/environment";

type PocketbaseRecord = {
    readonly id: string
    readonly collectionId: string
    readonly collectionName: string
    readonly created: string // in form of Date
    readonly updated: string // in form of Date
}

export interface DatabaseUser extends PocketbaseRecord {
    readonly username: string
    readonly discordId: string
    // readonly avatar: string // TODO: Maybe
    readonly suggestions: string[] // DatabaseSuggestion
    readonly votes: string[] // DatabaseSuggestion
}

export interface DatabaseSuggestion extends PocketbaseRecord {
    readonly name: string
    readonly suggester: string // DatabaseUser
    readonly media: string
    readonly type: "emoji" | "animated" | "sticker" | "soundboard"
    readonly status: "added" | "accepted" | "denied"
    readonly votes: number
}

export interface Suggestion extends DatabaseSuggestion {
    readonly mediaURL: string
    readonly votesWritable: Writable<number>
    readonly votedOn: Writable<boolean>
}

export const suggestionVotesDatabase = new Map<string, Writable<number>>();
export const suggestionVotedOnDatabase = new Map<string, Writable<boolean>>();

export const getSuggestionMediaURL = (suggestion: DatabaseSuggestion) => `https://cdn.zelo.dev/api/files/${suggestion.collectionId}/${suggestion.id}/${suggestion.media}`

export const getRandomSuggestions = (list: DatabaseSuggestion[]) => {
    const randomRecords = sample(list, 12)
    return parseSuggestions(randomRecords)
}

export const getRecentSuggestions = (list: DatabaseSuggestion[]) => {
    return parseSuggestions(list)
}

export const parseSuggestions = (suggestionList: DatabaseSuggestion[]) => {
    const newList: Suggestion[] = []
    for (const suggestion of suggestionList) {
        let votesWritable = suggestionVotesDatabase.get(suggestion.id)
        if (!votesWritable) {
            votesWritable = writable(suggestion.votes)
            suggestionVotesDatabase.set(suggestion.id, votesWritable)
        }

        let votedOn = suggestionVotedOnDatabase.get(suggestion.id)
        if (!votedOn) {
            votedOn = writable(false)
            suggestionVotedOnDatabase.set(suggestion.id, votedOn)
        }

        newList.push({
            ...suggestion,
            mediaURL: getSuggestionMediaURL(suggestion),
            votesWritable,
            votedOn,
        })
    }

    return newList;
}

export const sample = <T>(array: T[], amount: number) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, amount);
}

export const siteURL = dev ? "http://localhost:5173" : "https://htc-suggestion-prototype.netlify.app"
export const redirectURL = siteURL + "/callback/"