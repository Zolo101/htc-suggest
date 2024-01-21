<script lang="ts">
    import type { DatabaseSuggestion } from "$lib/index";

    export let type: DatabaseSuggestion["type"];
    export let media: File;

    let dataURL: string;
    // turn file into image as base64
    const reader = new FileReader();
    console.log(media)
    reader.readAsDataURL(media)
    reader.onloadend = () => dataURL = reader.result as string;

    const previews = [256, 128, 64, 32]
</script>

<div class="flex bg-[#424549] gap-4 p-5 m-5 rounded">
    {#each previews as preview}
        <div>
            <img width={preview} height={preview} src={dataURL} alt="preview" class="object-cover"/>
            <span class="text-sm text-white/70">{preview}px</span>
        </div>
    {/each}
</div>