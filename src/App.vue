<script setup>
import { ref } from 'vue';
const screenPointer = ref(0);
const scoreCard = ref({
    correct: 0,
    wrong: 0,
    skipped: 0,
    total: 0,
    accuracy: 0,
});

const resetScore = () => {
    scoreCard.value.correct = 0;
    scoreCard.value.wrong = 0;
    scoreCard.value.skipped = 0;
    scoreCard.value.total = 0;
    scoreCard.value.accuracy = 0;
};

</script>

<template>
    <div class="surface-0" style="padding-bottom: 4.5rem;">
        <div v-show="screenPointer === 0">
            <h2 class="text-xl text-center font-semibold">Funglish Scoreboard</h2>
            <div class="my-2 flex align-items-center justify-content-between px-2">
                <div class="text-xl font-semibold">Correct</div>
                <div>{{ scoreCard.correct }}</div>
            </div>
            <div class="my-2 flex align-items-center justify-content-between px-2">
                <div class="text-xl font-semibold">Wrong</div>
                <div>{{ scoreCard.wrong }}</div>
            </div>
            <div class="my-2 flex align-items-center justify-content-between px-2">
                <div class="text-xl font-semibold">Skipped</div>
                <div>{{ scoreCard.skipped }}</div>
            </div>
            <div class="my-2 flex align-items-center justify-content-between px-2">
                <div class="text-xl font-semibold">Total</div>
                <div>{{ scoreCard.total }}</div>
            </div>
            <div class="my-2 flex align-items-center justify-content-between px-2">
                <div class="text-xl font-semibold">Accuracy</div>
                <div>{{ scoreCard.accuracy }}%</div>
            </div>
            <div class="text-center">
                <Button label="Reset" @click="resetScore" variant="contained" severity="secondary" />
            </div>
        </div>
        <!--  -->
        <div v-show="screenPointer === 1">

        </div>
        <div v-show="screenPointer === 2">
            <div class="text-xl font-semibold">Funglish</div>
            <p class="my-0">Learn English with fun</p>
            <p>
                This is a simple app to learn English with fun.
                You can learn English words and their meanings with this app.
                You can also play games to test your knowledge.
            </p>
            <p>
                Created by <a href="https://github.com/surajsinghbisht054" target="_blank">Suraj Singh</a>
            </p>
        </div>
    </div>
    <div
        class="fixed surface-100 bottom-0 left-0 z-5 shadow-1 border-top-1 border-200 w-full h-4rem flex align-items-center justify-content-around">
        <Button icon="pi pi-clipboard" variant="text" severity="secondary" @click="screenPointer = 1" />
        <Button icon="pi pi-play-circle" variant="text" severity="secondary" @click="screenPointer = 0" />
        <Button icon="pi pi-user" variant="text" severity="secondary" @click="screenPointer = 2" />
    </div>
</template>
<style>
body {
    background-color: var(--p-surface-0);
}
</style>