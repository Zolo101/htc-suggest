<script lang="ts">
    import SuggestionPanel from "$lib/SuggestionPanel.svelte";
    import { type DatabaseSuggestion, type DatabaseUser, type Suggestion } from "$lib/index";

    export let title: string;
    export let user: DatabaseUser;
    export let list: DatabaseSuggestion[];
    export let filter: (dbs: DatabaseSuggestion[]) => Suggestion[];
    export let rerollButton = false;

    $: suggestions = filter(list);

    const reroll = () => suggestions = filter(list);
</script>

<div class="flex gap-4">
    <h1>{title}</h1>
    {#if rerollButton}
        <button class="bg-white/50" on:click={reroll}>Re-Roll</button>
    {/if}
</div>
<div class="grid list gap-3">
    {#key suggestions}
        {#each suggestions as suggestion}
            <SuggestionPanel {user} {suggestion}/>
        {/each}
    {/key}
</div>

<style>
    /* One of the few times tailwind has failed me */
    .list {
        grid-template-columns: repeat(auto-fill, minmax(154px, 1fr));
    }
</style>