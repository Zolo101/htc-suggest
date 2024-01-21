<script lang="ts">
    import { type Writable } from "svelte/store";
    import { fly } from "svelte/transition";

    // WORK IN PROGRESS

    // in seconds
    export let duration: number = 2;

    export let delay: number = 0;

    export let value: Writable<number>;
    let oldValue = $value;

    let aElement: HTMLSpanElement;
    let bElement: HTMLSpanElement;

    let switchAnimation = true;

    const onChange = (v: number) => {
        const isIncrease = Math.sign(v - oldValue);
        if (isIncrease === 0) return; // No change

        switchAnimation = !switchAnimation;

        oldValue = v
        // setTimeout(() => {
        // }, duration * 1000);
    }

    value.subscribe(onChange);
</script>

<div>
    {#if switchAnimation}
        <span
                bind:this={aElement}
                in:fly={{y: -10, duration, delay}}
                out:fly={{y: 10, duration, delay}}
        >{$value} 1</span>
    {:else}
        <span
                bind:this={bElement}
                in:fly={{y: 100, duration, delay}}
                out:fly={{y: -100, duration, delay}}
        >{oldValue} 2</span>
    {/if}
</div>