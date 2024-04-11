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

<div class="max-w-[1440px] h-full bg-black/10 m-auto px-10 pt-5">
    <header class="mb-2">
        <a class="text-[#10C985] font-bold text-6xl no-underline" href="/">suggest.htwinscentr.al</a>
    </header>
    <main>
        <slot/>
    </main>
</div>
