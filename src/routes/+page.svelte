<script lang="ts">
    import List from "$lib/List.svelte";
    import type { PageData } from "./$types";
    import { type DatabaseUser, getRandomSuggestions, getRecentSuggestions } from "$lib";

    export let data: PageData;

    let user = data.user as DatabaseUser;
    let full = data.full;
</script>

<div class="text-xl justify-center p-5">
    <span>Welcome, {user.username}! Would you like to</span>
    <ul>
        <li><a href="/suggest">Make a suggestion</a></li>
        <li><a href="/own">View your suggestions</a></li>
    </ul>
<!--    <a class="button text-2xl !bg-lime-200" href="/suggest">Upload a suggestion!</a>-->
    <!--            <button class="text-2xl bg-purple-100">Login</button>-->
</div>
<p class="font-bold text-xl text-center pb-5">Click on a suggestion to upvote it!</p>
<hr>
<!--<div class="flex justify-center text-center gap-5">-->
<!--    <Remaining name="emoji" remaining={82}/>-->
<!--    <Remaining name="animated emoji" remaining={232}/>-->
<!--    <Remaining name="sticker" remaining={22}/>-->
<!--    <Remaining name="soundboard" remaining={12}/>-->
<!--</div>-->
<div class="flex max-lg:flex-col">
    <div class="flex flex-col grow gap-2 pt-2 pb-12">
        <List rerollButton {user} list={full} title="Random" filter={getRandomSuggestions}/>
        <hr>
        <List {user} list={full} title="Recent" filter={getRecentSuggestions}/>
    </div>
<!--    <div class="pl-5">-->
<!--        <p class="font-bold text-4xl">News</p>-->
<!--      New accepted suggestions   -->
<!--        <div class="flex flex-col gap-2 pl-5 pt-2">-->
<!--            {#each new Array(10) as _, i}-->
<!--                <div>-->
<!--                    <span class="text-white/30">{i} days ago</span>-->
<!--                    <img class="inline" width="32" height="32" src={oyah}/>-->
<!--                    <span class="font-bold">has been added!</span>-->
<!--                </div>-->
<!--            {/each}-->
<!--        </div>-->
<!--    </div>-->
</div>
