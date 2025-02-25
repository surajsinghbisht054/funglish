<script setup>
import { useLocalStorage } from '@vueuse/core'
const configValues = useLocalStorage(
    'funglish-config-values',
    {
        bg_sound_volume: 0.3,
        change_sound_volume: 0.5,
        correct_sound_volume: 0.5,
        wrong_sound_volume: 0.5,
        transition_time: 5000,
    },
)
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

    <Card  class="my-2">
        <template #title>Sound Effect Volume</template>
        <template #content>
            <div class="flex flex-column gap-2">
                <div>Background</div>
                <Slider v-model="configValues.bg_sound_volume" :min="0" :max="1.0" :step="0.1" />

                <div>Change</div>
                <Slider v-model="configValues.change_sound_volume" :min="0" :max="1.0" :step="0.1" />

                <div>Correct</div>
                <Slider v-model="configValues.correct_sound_volume" :min="0" :max="1.0" :step="0.1" />

                <div>Wrong</div>
                <Slider v-model="configValues.wrong_sound_volume" :min="0" :max="1.0" :step="0.1" />


            </div>
        </template>
    </Card>

    <Card class="my-2">
        <template #title>Speed</template>
        <template #content>
            <Slider v-model="configValues.transition_time" :min="1000" :max="10000" :step="1000" />
        </template>
    </Card>
</template>