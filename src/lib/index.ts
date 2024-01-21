import { suggestions } from "$lib/pocketbase";
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
    readonly suggestions: DatabaseSuggestion[]
    readonly votes: DatabaseSuggestion[]
}

export interface DatabaseSuggestion extends PocketbaseRecord {
    readonly name: string
    readonly suggester: DatabaseUser
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

export type SuggestionForm = Pick<DatabaseSuggestion, "name" | "media" | "type">

export const getSuggestionMediaURL = (suggestion: DatabaseSuggestion) => `https://cdn.zelo.dev/api/files/${suggestion.collectionId}/${suggestion.id}/${suggestion.media}`

// const full = await suggestions.getFullList()

export const getRandomSuggestions = (list: DatabaseSuggestion[]) => {
    // const full = await suggestions.getFullList()
    const randomRecords = sample([...list], 12)

    return parseSuggestions(randomRecords)
}

export const getRecentSuggestions = (list: DatabaseSuggestion[]) => {
    // const full = await suggestions.getFullList()

    return parseSuggestions(list)
}

const parseSuggestions = (suggestionList: DatabaseSuggestion[]) => {
    const newList: Suggestion[] = []
    for (const suggestion of suggestionList) {
        newList.push({
            ...suggestion,
            mediaURL: getSuggestionMediaURL(suggestion),
            votesWritable: writable(suggestion.votes),
            votedOn: writable(false),
        })
    }

    return newList;
}

export const buildSuggestion = (form: SuggestionForm) => suggestions.create(form)

export const sample = <T>(array: T[], amount: number) => {
    let result = []
    let arrayToSplice = [...array]
    for (let i = 0; i < Math.min(amount, arrayToSplice.length); i++) {
        const index = ~~(Math.random() * arrayToSplice.length)
        result.push(array[index])
        arrayToSplice.splice(index, 1)
    }
    return result
}

export const siteURL = dev ? "http://localhost:5173" : "https://htc-suggestion-prototype.netlify.app"
export const redirectURL = siteURL + "/callback/"