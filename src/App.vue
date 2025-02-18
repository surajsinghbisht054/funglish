<script setup>
import { onMounted, ref } from 'vue';
import word_translations from './words.json';
import { useLocalStorage } from '@vueuse/core'
import { useIntervalFn } from '@vueuse/core';
import { useVibrate } from '@vueuse/core';
import { useWakeLock } from '@vueuse/core'
import { UseScreenSafeArea } from '@vueuse/components'

const { vibrate, isSupported } = useVibrate();

onMounted(() => {
    const { request } = useWakeLock()
    request('screen')

})

// All the words with length greater than 3
const EnglishWordList = Object.keys(word_translations).filter((word) => word.length > 3);

const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * EnglishWordList.length);
    return EnglishWordList[randomIndex];
};

const getWordTranslation = (word) => {
    const [hindi, chineses, russian] = word_translations[word];
    return { hindi, chineses, russian };
};

const screenSwitchPtr = ref(0);
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

const resetScore = () => {
    scoreCard.value.correct = 0;
    scoreCard.value.wrong = 0;
    scoreCard.value.skipped = 0;
    scoreCard.value.total = 0;
    scoreCard.value.accuracy = 0;
};
const updateScore = (type) => {
    scoreCard.value.lastWord = `${boardData.value?.correctWord} = ${boardData.value?.translation?.hindi}`;
    scoreCard.value[type] += 1;
    scoreCard.value.total += 1;
    scoreCard.value.accuracy = Math.round((scoreCard.value.correct / scoreCard.value.total) * 100);
    if (isSupported) {
        if (type === 'wrong') {
            vibrate(100);
        }
    }
};
const boardData = ref({
    correctWord: '',
    translation: {},
    words: [],
    userSelectedWord: '',
})

const { pause, resume, isActive } = useIntervalFn(() => {
    // update score
    if (boardData.value.correctWord && boardData.value.userSelectedWord === '') {
        updateScore('skipped');
    } else if (boardData.value.correctWord && boardData.value.userSelectedWord === boardData.value.correctWord) {
        updateScore('correct');
    } else if (boardData.value.correctWord && boardData.value.userSelectedWord !== boardData.value.correctWord) {
        updateScore('wrong');
    }

    const correctWord = getRandomWord();
    const correctWordTranslation = getWordTranslation(correctWord);
    const words = [getRandomWord(), getRandomWord(), getRandomWord(), getRandomWord(), correctWord];
    // Shuffle the words
    words.sort(() => Math.random() - 0.5);
    boardData.value = {
        translation: correctWordTranslation,
        userSelectedWord: '',
        correctWord,
        words,
    };
}, 5000)
pause();
</script>

<template>
    <UseScreenSafeArea top right bottom left>
        <div style="padding-bottom: 4.5rem;">
            <!-- Game -->
            <div v-show="screenSwitchPtr === 0">
                <div class="flex align-items-center justify-content-center gap-2 p-2">
                    <Button v-if="isActive" label="Click to Pause" @click="pause" />
                    <Button v-else label="Click to Play" @click="resume" />
                </div>

                <div class="flex align-items-center justify-content-between gap-2 p-2">
                    <div class="text-2xl font-semibold">{{ boardData.translation.hindi || '[....]' }}</div>
                    <div class="capitalize text-xl">{{ scoreCard.lastWord }}</div>
                </div>
                <div v-if="boardData.translation.hindi" class="loading-container" :key="boardData">
                    <div class="loading-bar"></div>
                </div>
                <div v-if="!boardData.translation.hindi" class="text-center">
                    <h3>Game Instructions</h3>
                    <p>Game will show you a word in hindi and you have to select the correct translation in English.</p>
                    <p>For each correct answer you will get 1 point.</p>
                    <p>For each wrong answer you will get -1 point.</p>
                    <p>For each skipped answer you will get 0 point.</p>
                    <p>One word will be shown for 4 seconds.</p>
                </div>
                <div v-else class="w-full flex flex-wrap gap-3 md:gap-8 p-2 md:p-4">
                    <label v-for="word in boardData.words" :key="word" @click="boardData.userSelectedWord = word"
                        class="gameSelection animate__animated animate__rollIn animate__fast capitalize border-1 border-200 font-semibold text-xl md:text-2xl p-2 md:p-4 border-round bg-indigo-50 cursor-pointer">
                        <span>{{ word }}</span>
                        <input type="radio" name="gameSelection" class="hidden" />
                    </label>
                </div>
            </div>
            
            <!-- ScoreBoard -->
            <div v-show="screenSwitchPtr === 1">
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

            <!-- About -->
            <div v-show="screenSwitchPtr === 2">
                <div class="text-xl font-semibold">Funglish</div>
                <p class="my-0">Learn English with fun</p>
                <p>
                    This is a simple app to learn English with fun.
                    You can learn english vocubulary with this app.
                    Learn English with fun and enjoy the learning.
                </p>
                <p>
                    Created by <a href="https://github.com/surajsinghbisht054" target="_blank">Suraj Singh</a>
                </p>
            </div>
        </div>
        <div
            class="fixed surface-100 bottom-0 left-0 z-5 shadow-1 border-top-1 border-200 w-full h-4rem flex align-items-center justify-content-around">
            <Button class="text-3xl" icon="pi pi-play-circle" variant="text" severity="secondary"
                @click="screenSwitchPtr = 0; pause();" />
            <Button class="text-3xl" icon="pi pi-clipboard" variant="text" severity="secondary"
                @click="screenSwitchPtr = 1; pause();" />
            <Button class="text-3xl" icon="pi pi-user" variant="text" severity="secondary"
                @click="screenSwitchPtr = 2; pause();" />
        </div>

    </UseScreenSafeArea>
</template>
<style>
:root {
    --font-size: 16px;
}

body {
    background-color: var(--p-blue-50);

}

.gameSelection:has(input[type="radio"]:checked) {
    background-color: var(--p-indigo-500) !important;
    color: var(--p-surface-0);
}

.loading-container {
    width: calc(95vw);
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    height: 10px;
    background-color: var(--p-blue-50);
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--p-blue-200);
}

.loading-bar {
    width: 0;
    height: 100%;
    background-color: var(--p-green-500);
    animation: load 5s linear forwards;
}

@keyframes load {
    from {
        width: 0;
    }

    to {
        width: 100%;
    }
}
</style>