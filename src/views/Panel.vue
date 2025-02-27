<template>
    <h2 class="text-center">Panel</h2>
    <div class="p-2">
        <div @click="$router.push({ name: 'game' })"
            class="surface-0 w-full m-2 p-3 border-200 border-1 border-round flex justify-content-between align-items-center">
            <div class="flex gap-2 align-items-center">
                <i class="pi pi-play-circle"></i>
                <div>Game</div>
            </div>
            <div class="p-2 cursor-pointer" >
                <i class="pi pi-arrow-right"></i>
            </div>
        </div>
        <div @click="$router.push({ name: 'scoreboard' })"
            class="surface-0 w-full m-2 p-3 border-200 border-1 border-round flex justify-content-between align-items-center">
            <div class="flex gap-2 align-items-center">
                <i class="pi pi-address-book"></i>
                <div>Scoreboard</div>
            </div>
            <div class="p-2 cursor-pointer" >
                <i class="pi pi-arrow-right"></i>
            </div>
        </div>
        <div @click="$router.push({ name: 'dictionary' })"
            class="surface-0 w-full m-2 p-3 border-200 border-1 border-round flex justify-content-between align-items-center">
            <div class="flex gap-2 align-items-center">
                <i class="pi pi-book"></i>
                <div>Dictionary</div>
            </div>
            <div class="p-2 cursor-pointer" >
                <i class="pi pi-arrow-right"></i>
            </div>
        </div>
        <div @click="$router.push({ name: 'conversation' })"
            class="surface-0 w-full m-2 p-3 border-200 border-1 border-round flex justify-content-between align-items-center">
            <div class="flex gap-2 align-items-center">
                <i class="pi pi-comments"></i>
                <div>Conversation</div>
            </div>
            <div class="p-2 cursor-pointer" >
                <i class="pi pi-arrow-right"></i>
            </div>
        </div>
        <div @click="$router.push({ name: 'idioms' })"
            class="surface-0 w-full m-2 p-3 border-200 border-1 border-round flex justify-content-between align-items-center">
            <div class="flex gap-2 align-items-center">
                <i class="pi pi-sparkles"></i>
                <div>Idioms</div>
            </div>
            <div class="p-2 cursor-pointer" >
                <i class="pi pi-arrow-right"></i>
            </div>
        </div>
        <div @click="$router.push({ name: 'twisters' })"
            class="surface-0 w-full m-2 p-3 border-200 border-1 border-round flex justify-content-between align-items-center">
            <div class="flex gap-2 align-items-center">
                <i class="pi pi-graduation-cap"></i>
                <div>Twisters</div>
            </div>
            <div class="p-2 cursor-pointer" >
                <i class="pi pi-arrow-right"></i>
            </div>
        </div>
        <div @click="$router.push({ name: 'about' })"
            class="surface-0 w-full m-2 p-3 border-200 border-1 border-round flex justify-content-between align-items-center">
            <div class="flex gap-2 align-items-center">
                <i class="pi pi-cog"></i>
                <div>Settings</div>
            </div>
            <div class="p-2 cursor-pointer" >
                <i class="pi pi-arrow-right"></i>
            </div>
        </div>
    </div>
</template>