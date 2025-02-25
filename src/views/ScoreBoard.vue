<script setup>
import { useLocalStorage } from '@vueuse/core'

const scoreCard = useLocalStorage(
    'funglish-score-card',
    {
        correct: 0,
        wrong: 0,
        skipped: 0,
        total: 0,
        accuracy: 0,
        lastWord: '',
    },
)



const scoreRecord = useLocalStorage(
    'funglish-word-record', []
)


const resetScore = () => {
    scoreCard.value.correct = 0;
    scoreCard.value.wrong = 0;
    scoreCard.value.skipped = 0;
    scoreCard.value.total = 0;
    scoreCard.value.accuracy = 0;
    scoreRecord.value = [];
};
</script>

<template>
    <h2 class="text-center">Scoreboard</h2>
    <div class="my-2 flex align-items-center justify-content-between px-2">
        <h4 class="my-1">Correct</h4>
        <div>{{ scoreCard.correct }}</div>
    </div>
    <div class="my-2 flex align-items-center justify-content-between px-2">
        <h4 class="my-1">Wrong</h4>
        <div>{{ scoreCard.wrong }}</div>
    </div>
    <div class="my-2 flex align-items-center justify-content-between px-2">
        <h4 class="my-1">Skipped</h4>
        <div>{{ scoreCard.skipped }}</div>
    </div>
    <div class="my-2 flex align-items-center justify-content-between px-2">
        <h4 class="my-1">Total</h4>
        <div>{{ scoreCard.total }}</div>
    </div>
    <div class="my-2 flex align-items-center justify-content-between px-2">
        <h4 class="my-1">Accuracy</h4>
        <div>{{ scoreCard.accuracy }}%</div>
    </div>
    <div class="text-center">
        <Button label="Reset" @click="resetScore" />
    </div>
    <Card v-for="data in scoreRecord.slice().reverse()" :key="data.w" style="margin-top: 8px;">
        <template #title>
            {{ data.w.join(',') }}
        </template>
        <template #subtitle>
            {{ data.p }}
        </template>
        <template #content>
            <p class="m-0" v-for="line in data.e" :key="line">
                {{ line }}
            </p>
        </template>

    </Card>

</template>