<script lang="ts">
    import "../app.css";
    import { onNavigate } from "$app/navigation";

    onNavigate((navigation) => {
        // @ts-ignore
        if (!document.startViewTransition) return;

        return new Promise((resolve) => {
            // @ts-ignore
            document.startViewTransition(async () => {
                resolve()
                await navigation.complete;
            })
        })
    })
</script>

<main class="h-full bg-[#1A4D58]">
    <div class="max-w-[1440px] h-full grow m-auto bg-black/10 px-10 pt-5">
        <a class="text-[#10C985] font-bold text-6xl no-underline" href="/">suggest.htwinscentr.al</a>
        <slot/>
    </div>
</main>
