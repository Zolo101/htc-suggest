<script lang="ts">
    import { page } from "$app/stores";
</script>

<div class="flex flex-col items-center w-1/2 m-auto">
    <p class="font-bold" style="font-size: 8em">{$page.status}</p>
    <p class="font-bold">{$page.error?.message}</p>
    {#if $page.status >= 500}
        <div style="background-color: rgba(139,0,0,0.4);" class="rounded p-4">
            <p class="font-bold text-2xl text-center p-5">There's been a server error!</p>
            <span>Please DM @zelo101 AKA "Evil Donut" with what you were doing, along with this timestamp:</span>
            <span>{JSON.stringify(new Date())}</span>
        </div>
    {/if}

    <a href="/">Go Home</a>
</div>