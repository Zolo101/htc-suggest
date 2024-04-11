<script lang="ts">
    import { type DatabaseSuggestion } from "$lib";
    import Dropzone from "svelte-file-dropzone";
    import { enhance } from "$app/forms";
    import Preview from "$lib/Preview.svelte";
    import { fly, slide } from "svelte/transition";
    import { writable, type Writable } from "svelte/store";

    let name: string;
    let media: Writable<File | null> = writable(null);
    let mediaElement: HTMLInputElement;
    let type: DatabaseSuggestion["type"] | "" = "";
    $: typeAccept = {
        emoji: "image/jpeg,image/png,image/webp,",
        animated: "image/gif",
        sticker: "image/jpeg,image/png,image/gif,image/webp,image/vnd.mozilla.apng",
        soundboard: "audio/mpeg,audio/ogg,audio/wav,audio/webm"
    }

    const handleDrop = (e: CustomEvent<{acceptedFiles: File[]}>) => {
        console.log(e)
        $media = e.detail.acceptedFiles[0];

        let dt = new DataTransfer()
        dt.items.add($media)
        mediaElement.files = dt.files
    }
</script>

<form method="post" class="mt-5" enctype="multipart/form-data" use:enhance>
    <label for="name">Name of suggestion</label>
    <br>
    <input name="name" bind:value={name} maxlength="64"/>
    <br>
    <label for="type">Type of suggestion</label>
    <br>
    <select name="type" bind:value={type}>
        <option value="">-- Select --</option>
        <option value="emoji">Emoji</option>
        <option value="animated">Animated Emoji</option>
        <option value="sticker">Sticker</option>
        <option value="soundboard">Soundboard</option>
    </select>
    <br>
    {#if type !== ""}
        <div class="flex" transition:fly={{y: 10}}>
            <div class="w-1/2 pr-5">
                <label for="media">Upload</label>
                <input id="media" name="media" type="file" bind:this={mediaElement} hidden/>
                <br><br>
                <Dropzone
                        accept={typeAccept[type]}
                        inputElement="media"
                        multiple={false}
                        maxSize={1000000}
                        required={true}
                        disableDefaultStyles={true}
                        containerClasses="flex flex-col items-center bg-black/30 rounded outline outline-1 outline-dashed outline-white/50 p-5"

                        on:drop={handleDrop}
                >
                    <p class="font-bold text-lg">Drag and drop your file here!</p>
                    <p class="font-bold text-lg">Or click here to select a file!</p>
                </Dropzone>
            </div>
            <div class="w-1/2">
                <p class="font-bold text-2xl">Requirements</p>
                <ul transition:fly={{y: 10}}>
                    <li>The file must be below 1MB.</li>
                    {#if type !== "soundboard"}
                        <li transition:slide>The suggestion must be made by you!</li>
                        <li transition:slide>Must have a transparent background if applicable</li>
                        <li transition:slide>Must not have the <a href="../youtube_fade.png">youtube fade gradient</a></li>
                    {:else}
                        <li transition:slide>The audio must be less than 5 seconds long.</li>
                    {/if}
                    {#if type === "emoji" || type === "animated"}
                        <li transition:slide> Must be from a image/scene in BFDI/TPOT episodes.</li>
                    {/if}
                    {#if type === "sticker" || type === "soundboard"}
                        <li transition:slide>Must be relevant to a HTwins project.</li>
                    {/if}
                    <!--        <li>If your emote doesn't meet these requirements, a moderator will give a ❌ reaction.</li>-->
                    <!--        <li>If your suggestion gets added there'll be a ✅ reaction!</li>-->
                </ul>
                <br>

                {#if type === "emoji" || type === "animated"}
                    <p class="font-bold" transition:slide>Not a requirement, but try and get your emoji near the 1:1 aspect ratio for best results!</p>
                {/if}
            </div>
        </div>
        {#if $media !== null}
            <div transition:fly={{y: 10}}>
                <p class="font-bold text-2xl">Preview</p>
                <Preview {type} {media}/>
                <br>
<!--                <input name="spoiler" type="checkbox" bind:value={name} maxlength="64"/>-->
<!--                <label class="!text-sm !font-normal" for="spoiler">Is your suggestion a spoiler?</label>-->
<!--                <br>-->
                <button type="submit" class="bg-green-300 p-3 mb-4">Submit Suggestion</button>
            </div>
        {/if}
    {/if}
</form>

<style>
    input, select {
        @apply text-2xl text-[#e6ffe8] bg-black/30 border-2 border-white/50 rounded-md p-2;
    }

    input, select {
        @apply mb-5 mt-1;
    }
</style>