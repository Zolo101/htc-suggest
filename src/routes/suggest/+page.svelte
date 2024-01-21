<script lang="ts">
    import { buildSuggestion, type DatabaseSuggestion } from "$lib";
    import Dropzone from "svelte-file-dropzone";
    import Preview from "$lib/Preview.svelte";
    import { fly } from "svelte/transition";

    let name: string;
    let media: File | null = null;
    let type: DatabaseSuggestion["type"] | "" = "";
    $: typeAccept = {
        emoji: "image/jpeg,image/png,image/webp,",
        animated: "image/gif",
        sticker: "image/jpeg,image/png,image/gif,image/webp,image/vnd.mozilla.apng",
        soundboard: "audio/mpeg,audio/ogg,audio/wav,audio/webm"
    }

    const onSubmit = (e: SubmitEvent) => {
        // check 5beam-next on how to create multipart form data
        // buildSuggestion({name, media, type})
    }

    const handleDrop = (e: CustomEvent<{acceptedFiles: File[]}>) => {
        console.log(e)
        media = e.detail.acceptedFiles[0];
    }
</script>

<form on:submit|preventDefault={onSubmit} class="mt-5">
    <label for="name">Name of suggestion</label>
    <br>
    <input id="name" bind:value={name} maxlength="64"/>
    <br>
    <label for="type">Type of suggestion</label>
    <br>
    <select id="type" bind:value={type}>
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
                <input id="media" type="file" bind:value={media} hidden/>
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
                    <p class="font-bold text-2xl">Drag and drop your file here!</p>
                    <p class="font-bold text-2xl">Or click here to select a file!</p>
                </Dropzone>
            </div>
            <div class="w-1/2">
                <p class="font-bold text-2xl">Requirements</p>
                <ul>
                    <!--        <li>Your suggestion must have a name</li>-->
                    <li>The suggestion must be made by you!</li>
                    <li>Must have a transparent background if applicable</li>
                    <li>Must not have the <a href="../youtube_fade.png">youtube fade gradient</a></li>
                    {#if type === "emoji" || type === "animated"}
                        <li>Must be from a image/scene in BFDI/TPOT episodes.</li>
                    {/if}
                    {#if type === "sticker" || type === "soundboard"}
                        <li>Must be relevant to a HTwins project.</li>
                    {/if}
                    <!--        <li>If your emote doesn't meet these requirements, a moderator will give a ❌ reaction.</li>-->
                    <!--        <li>If your suggestion gets added there'll be a ✅ reaction!</li>-->
                </ul>
                <br>
                <p class="font-bold">Not a requirement, but try and get your emoji near the 1:1 aspect ratio for best results!</p>
            </div>
        </div>
        {#if media !== null}
            <div transition:fly={{y: 10}}>
                <p class="font-bold text-2xl">Preview</p>
                <Preview {type} {media}/>
                <br>
                <button type="submit" class="bg-green-300">Submit Suggestion</button>
            </div>
        {/if}
    {/if}
</form>

<style>
    label {
        @apply text-2xl font-bold;
    }

    input, select {
        @apply text-2xl text-[#e6ffe8] bg-black/30 border-2 border-white/50 rounded-md p-2;
    }

    input, select {
        @apply mb-5 mt-1;
    }
</style>