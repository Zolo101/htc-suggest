<script lang="ts">
    export let name: string;
    export let remaining: number;
</script>

<div class="inline-flex text-sm outline outline-4 outline-lime-500 rounded">
    <div class="font-bold p-2 bg-white">
        <p class="text-black">{remaining}</p>
    </div>
    <div class="bg-lime-500 font-bold text-white p-2">
        <span>{name} slots available</span>
    </div>
</div>