<script lang="ts">
    import { type DatabaseUser, parseSuggestions } from "$lib";
    import type { PageData } from "./$types";
    import List from "$lib/List.svelte";

    export let data: PageData;

    let user = data.user as DatabaseUser;
    let own = data.own;

</script>

<div class="flex flex-col gap-2 p-5">
    <section>
        <List {user} title="{user.username}'s suggestions" filter={parseSuggestions} list={own}/>
    </section>
</div>
