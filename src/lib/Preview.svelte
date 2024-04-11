<script lang="ts">
    import type { DatabaseSuggestion } from "$lib/index";
    import type { Writable } from "svelte/store";

    export let type: DatabaseSuggestion["type"];
    export let media: Writable<File | null>;

    $: dataURL = "";

    const previews = [256, 128, 64, 32]
    media.subscribe(file => {
        // if (file && type !== "soundboard") {
        if (file) {
            // turn file into image as base64
            const reader = new FileReader();
            console.log($media)
            reader.readAsDataURL($media!)
            reader.onloadend = () => dataURL = reader.result as string;
        }
    })
</script>

<div class="flex bg-[#424549] gap-4 p-5 m-5 rounded">
    {#if type !== "soundboard"}
        {#each previews as preview}
            <div>
                <img src={dataURL} height={preview} style="height: {preview}px; width: auto;" alt="preview" class="w-auto"/>
                <span class="text-sm text-white/70">{preview}px</span>
            </div>
        {/each}
    {:else}
        <audio src={dataURL} controls></audio>
    {/if}
</div>