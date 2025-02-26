<script setup>
import { UseScreenSafeArea } from '@vueuse/components'
import router from './router';
</script>

<template>
    <UseScreenSafeArea top right bottom left style="max-height: calc(100% - 5rem);">
        <main style="padding-bottom: 8rem;">
            <RouterView />
        </main>
    </UseScreenSafeArea>
    <nav class="fixed bottom-0 left-0 z-5 shadow-4 w-full h-4rem flex align-items-center justify-content-around surface-0">
        <div @click="router.push({name:'home' })" class="cursor-pointer p-4"><i class="pi pi-play-circle"></i></div>
        <div @click="router.push({name:'scoreboard' })" class="cursor-pointer p-4"><i class="pi pi-history"></i></div>
        <div @click="router.push({name:'dictionary' })" class="cursor-pointer p-4"><i class="pi pi-book"></i></div>
        <div @click="router.push({name:'conversation' })" class="cursor-pointer p-4"><i class="pi pi-comments"></i></div>
        <div @click="router.push({name:'about' })" class="cursor-pointer p-4"><i class="pi pi-cog"></i></div>
    </nav>
</template>
<style>
:root {
    --font-size: 16px;
}
</style>