<script setup>
import { configValues } from '../store';
</script>

<template>
    <div class="flex justify-content-between align-items-center px-1">
        <span class="p-2 cursor-pointer" @click="$router.push({name:'home' })"><i class="pi pi-arrow-left"></i></span>
        <h2 class="text-center">Settings</h2>
        <span  class="p-3"></span>
    </div>


    <Card  class="mt-2 mb-4">
        <template #title>Funglish</template>
        <template #subtitle>Learn English with fun</template>
        <template #content>
            This is a simple app to learn English with fun.
        You can learn english vocubulary with this app.
        Learn English with fun and enjoy the learning.
        </template>
        <template #footer>
            Created by <a href="https://github.com/surajsinghbisht054" target="_blank">Suraj Singh</a>
        </template>
    </Card>


    <Card class="my-2">
        <template #title>
            <div class="flex justify-content-between mb-4">
                <div>Volume ({{ configValues.sound_volume * 10 * configValues.sound }})</div>
                <ToggleSwitch v-model="configValues.sound" />
            </div>
        </template>
        <template #content>
            <Slider v-model="configValues.sound_volume" :min="0" :max="1.0" :step="0.1" :disabled="!configValues.sound" />
        </template>
    </Card>

    <Card class="my-2">
        <template #title>Speed ({{ configValues.transition_time }})</template>
        <template #content>
            <Slider v-model="configValues.transition_time" :min="2" :max="20" :step="1" />
        </template>
    </Card>
    
       
</template>