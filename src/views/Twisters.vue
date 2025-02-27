<script setup>
import { ref } from 'vue';
import TongueTwisterArray from '../data/tongue_twister.json';
const Twister = ref();
const drawVisible = ref(false);
</script>

<template>
    <div class="flex justify-content-between align-items-center px-1">
        <span class="p-2 cursor-pointer" @click="$router.push({name:'home' })"><i class="pi pi-arrow-left"></i></span>
        <h2 class="text-center">Tongue Twisters</h2>
        <span  class="p-3"></span>
    </div>

    <div class="p-2">
        <div v-for="data in TongueTwisterArray"
            class="surface-0 w-full m-2 p-3 border-200 border-1 border-round flex justify-content-between align-items-center"
            :key="data.focus" @click="Twister = data; drawVisible = true">
            <div>{{ data.focus }}</div>
            <div class="p-2 cursor-pointer" >
                <i class="pi pi-arrow-right"></i>
            </div>
        </div>
    </div>
    <Drawer v-model:visible="drawVisible" header="Tongue Twister" class="surface-ground" position="full">
        <Card class="my-4">
            <template #title>
                Focus
            </template>
            <template #content>
                <p>{{ Twister.focus }}</p>
            </template>
        </Card>
        <Card class="my-4">
            <template #title>
                Sound focus
            </template>
            <template #content>
                <p>{{ Twister.sound_focus.join(', ') }}</p>
            </template>
        </Card>
        <Card class="my-4">
            <template #title>
                Twister
            </template>
            <template #content>
                {{ Twister.tongue_twister }}
            </template>
        </Card>





    </Drawer>

</template>