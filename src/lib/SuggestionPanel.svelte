<script lang="ts">
    import { getSuggestionMediaURL, type DatabaseSuggestion, type Suggestion } from "$lib/index";
    import VoteCounter from "$lib/VoteCounter.svelte";
    import { derived } from "svelte/store";
    import { fade } from "svelte/transition";

    export let suggestion: Suggestion;
    const mediaURL = getSuggestionMediaURL(suggestion);
    const votes = derived(suggestion.votesWritable, (v) => v);
    const votedOn = derived(suggestion.votedOn, (v) => v);

    const onClick = (e: MouseEvent) => {
        if ($votedOn === false) {
            suggestion.votesWritable.set($votes + 1)
        } else {
            suggestion.votesWritable.set($votes - 1)
        }
        suggestion.votedOn.set(!$votedOn)
    }

    // no-underline border-black/40 border-4 rounded drop-shadow
    // hover:scale-[1.105] hover:drop-shadow-xl
    // transition-all
</script>

<a class="
    no-underline drop-shadow
    hover:scale-[1.05] hover:drop-shadow-xl
    transition-transform
" href="/#" on:click={onClick}>
    {#if suggestion.type === "emoji" || suggestion.type === "animated"}
        <div class="w-[154px] h-[168px] bg-lime-50/10 rounded-t rounded-bl p-2 transition-colors" class:votedOn={$votedOn}>
        <!--    <span>{suggestion.status}</span>-->
            <img class="w-[128px] h-[128px] m-auto" width="128" height="128" src={mediaURL} alt={suggestion.name}/>
            <div class="flex justify-center gap-0.5 text-xl text-center font-bold">
                <span class="font-black text-lime-600">:</span>
                <span>{suggestion.name}</span>
                <span class="font-black text-lime-600">:</span>
            </div>
<!--            <div class="flex items-center justify-between">-->
<!--                <span class="text-xs font-mono text-green-700 bg-green-300 shadow-md shadow-green-300 outline outline-2 outline-green-400 rounded p-0.5">{suggestion.type}</span>-->
<!--                <VoteCounter votes={suggestion.votesWritable}/>-->
<!--            </div>-->
        </div>
    {:else if suggestion.type === "sticker"}
        <div class="w-[154px] h-[168px] bg-lime-50/10 rounded-t rounded-bl p-2 transition-colors" class:votedOn={$votedOn}>
            <!--    <span>{suggestion.status}</span>-->
            <img class="m-auto" src={mediaURL} alt={suggestion.name}/>
            <p class="text-xl text-center font-bold">{suggestion.name}</p>
<!--            <div class="flex items-center justify-between">-->
<!--                <span class="text-xs font-mono text-blue-700 bg-blue-300 shadow-md shadow-blue-300 outline outline-2 outline-blue-400 rounded p-0.5">{suggestion.type}</span>-->
<!--                <VoteCounter votes={suggestion.votesWritable}/>-->
<!--            </div>-->
        </div>
    {:else if suggestion.type === "soundboard"}
        <div class="w-[154px] rounded-t rounded-bl p-2">
            <!--    <span>{suggestion.status}</span>-->
            <audio controls src={mediaURL} class="w-full"></audio>
            <p class="text-xl text-center font-bold">{suggestion.name}</p>
        </div>
    {/if}
    <div class="w-[154px] flex items-center justify-between">
        <div class="flex flex-col font-bold text-xs pl-1">
            <span class="text-opacity-50">{suggestion.type}</span>
            {#if $votedOn}
                <span transition:fade={{duration: 100}} class="text-orange-500">voted!</span>
            {/if}
        </div>
        <VoteCounter votes={suggestion.votesWritable}/>
    </div>
</a>

<style>
    img {
        @apply object-contain w-full h-[128px];
    }

    .votedOn {
        @apply bg-yellow-300/10;
    }
</style>