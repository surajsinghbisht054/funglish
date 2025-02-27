<template>
    <h2 class="text-center">Panel</h2>
    
    <div class="flex flex-wrap gap-4 p-2">
        <div @click="$router.push({name:'game' })" class="cursor-pointer w-10rem align-items-center surface-0 border-round shadow-2 justify-content-center p-4 flex flex-column gap-1">
            <i class="text-2xl mb-2 pi pi-play-circle"></i>
            <span>Game</span>
        </div>
        <div @click="$router.push({name:'scoreboard' })" class="cursor-pointer w-10rem align-items-center surface-0 border-round shadow-2 justify-content-center p-4 flex flex-column gap-1">
            <i class="text-2xl mb-2 pi pi-address-book"></i>
            <span>Scoreboard</span>
        </div>
        <div @click="$router.push({name:'dictionary' })" class="cursor-pointer w-10rem align-items-center surface-0 border-round shadow-2 justify-content-center p-4 flex flex-column gap-1">
            <i class="text-2xl mb-2 pi pi-book"></i>
            <span>Dictionary</span>
        </div>
        <div  @click="$router.push({name:'conversation' })" class="cursor-pointer w-10rem align-items-center surface-0 border-round shadow-2 justify-content-center p-4 flex flex-column gap-1">
            <i class="text-2xl mb-2 pi pi-comments"></i>
            <span>Conversation</span>
        </div>
        <div  @click="$router.push({name:'idioms' })" class="cursor-pointer w-10rem align-items-center surface-0 border-round shadow-2 justify-content-center p-4 flex flex-column gap-1">
            <i class="text-2xl mb-2 pi pi-sparkles"></i>
            <span>Idioms</span>
        </div>
        <div  @click="$router.push({name:'twisters' })" class="cursor-pointer w-10rem align-items-center surface-0 border-round shadow-2 justify-content-center p-4 flex flex-column gap-1">
            <i class="text-2xl mb-2 pi pi-graduation-cap"></i>
            <span>Twisters</span>
        </div>
        <div  @click="$router.push({name:'about' })" class="cursor-pointer w-10rem align-items-center surface-0 border-round shadow-2 justify-content-center p-4 flex flex-column gap-1">
            <i class="text-2xl mb-2 pi pi-cog"></i>
            <span>Settings</span>
        </div>
    </div>
</template>