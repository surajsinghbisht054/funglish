<script setup>
import { configValues } from '../store';
</script>

<template>
    <h2 class="text-center">Funglish</h2>
    <p class="my-0">Learn English with fun</p>
    <p>
        This is a simple app to learn English with fun.
        You can learn english vocubulary with this app.
        Learn English with fun and enjoy the learning.
    </p>
    <p>
        Created by <a href="https://github.com/surajsinghbisht054" target="_blank">Suraj Singh</a>
    </p>

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