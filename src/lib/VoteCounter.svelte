<script lang="ts">
    // import { NumberFlip } from "number-flip-animation";
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import oyah from "$lib/assets/oyah.png";
    import NumberFlipCounter from "$lib/NumberFlipCounter.svelte";

    export let votes: Writable<number>;

    let counter: HTMLSpanElement;

    onMount(() => {
        // const numberFlip = new NumberFlip({
        //     rootElement: counter,
        //     newNumber: $votes,
        // })

        // votes.subscribe((value) => {
        //     numberFlip.setNumberTo({newNumber: value})
        // })
    })
</script>

<span bind:this={counter} class="
    text-center font-black
    text-yellow-300 bg-yellow-200/30
    rounded-b flex items-center p-1">
<!--    <NumberFlipCounter value={votes}/>-->
    {$votes}
    <img src={oyah} alt="upvote" class="w-[32px] h-[28px] ml-1" />
</span>
<!--<span bind:this={counter} class="-->
<!--    text-center text-sm font-bold-->
<!--    text-yellow-600 bg-yellow-200 shadow-md shadow-yellow-200-->
<!--    outline outline-2 outline-yellow-300-->
<!--    rounded flex items-center p-1">-->
<!--    <img src={oyah} alt="upvote" class="w-[16px] h-[14px] ml-1" />-->
<!--</span>-->