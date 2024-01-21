<script lang="ts">
    import SuggestionPanel from "$lib/SuggestionPanel.svelte";
    import { type DatabaseSuggestion, type Suggestion } from "$lib/index";

    export let list: DatabaseSuggestion[];
    export let filter: (dbs: DatabaseSuggestion[]) => Suggestion[];
</script>

<div class="grid list gap-3">
    {#each filter(list) as suggestion}
        <SuggestionPanel {suggestion}/>
    {/each}
</div>

<style>
    /* One of the few times tailwind has failed me */
    .list {
        grid-template-columns: repeat(auto-fill, minmax(154px, 1fr));
    }
</style>