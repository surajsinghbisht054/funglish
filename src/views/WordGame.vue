<script setup>
import { onMounted, ref } from 'vue';
import { useLocalStorage } from '@vueuse/core'
import { useIntervalFn } from '@vueuse/core';
import { useVibrate } from '@vueuse/core';
import { useWakeLock } from '@vueuse/core';
import dictionary from '../data/dictionary.json';


const wordKeys = Object.keys(dictionary);

const { vibrate, isSupported } = useVibrate();
onMounted(() => {
    const { request } = useWakeLock()
    request('screen')

})

// All the words with length greater than 3
const EnglishWordList = wordKeys.filter((word) => word.length > 3);

const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * EnglishWordList.length);
    return EnglishWordList[randomIndex];
};

const getWordTranslation = (word) => {
    return dictionary[word];
};

const scoreCard = useLocalStorage(
    'funglish-score-card',
    {
        correct: 0,
        wrong: 0,
        skipped: 0,
        total: 0,
        accuracy: 0,
        lastWord: {},
    },
)

const scoreRecord = useLocalStorage(
    'funglish-word-record', []
)

const updateScore = (type) => {
    scoreCard.value.lastWord = boardData.value?.translation;
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

const gameLoop = () => {
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
    scoreRecord.value.push(correctWordTranslation);
    const words = [getRandomWord(), getRandomWord(), getRandomWord(), getRandomWord(), correctWord];
    words.sort(() => Math.random() - 0.5);

    boardData.value = {
        translation: correctWordTranslation,
        userSelectedWord: '',
        correctWord,
        words,
    };
}
const { pause, resume, isActive } = useIntervalFn(gameLoop, 5000)
pause();
</script>

<template>
    <h2 class="text-center">Game</h2>
    <Divider />
    <div class="flex justify-content-between my-2">
        <div>Score</div>
        <div>
            {{ scoreCard.correct }}/{{ scoreCard.total }}
        </div>
    </div>
    
    <template v-if="scoreCard.lastWord">
        <div class="capitalize text-xl">{{ scoreCard.lastWord.w.join(',') }}</div>
        <div>{{ scoreCard.lastWord.p }}</div>
        <div v-for="word in scoreCard.lastWord.e" :key="word" >{{ word }}</div>
    </template>
    
    <div v-if="boardData.translation?.e?.length" class="loading-container" :key="boardData">
        <div class="loading-bar"></div>
    </div>
    <div v-if="!boardData.translation?.e?.length" class="text-center">
        <h3>Instructions</h3>
        <div>
            Game will show you a word in hindi and you have to select the correct translation in English.<br>
            For each correct answer you will get 1 point. <br>
            For each wrong answer you will get -1 point. <br>
            For each skipped answer you will get 0 point. <br>
            One word will be shown for 4 seconds. <br>
        </div>
    </div>
    <Card v-else >
        <template #title>
            <span v-for="word in boardData.translation.e" :key="word" class="mr-2">{{ word }}</span>
        </template>

        <template #content>
            <div class="w-full flex flex-wrap gap-3 md:gap-8">
            <label v-for="word in boardData.words" :key="word" @click="boardData.userSelectedWord = word"
                class="checkbox-input gameSelection animate__animated shadow-1 animate__rollIn animate__fast capitalize p-2 md:p-4 bg-indigo-50 border-round cursor-pointer">
                <span>{{ word }}</span>
                <input type="radio" name="gameSelection" class="hidden" />
            </label>
        </div>
        </template>
    </Card>
    <div class="flex align-items-center justify-content-center gap-2 p-4" >
        <Button v-if="isActive" label="Click to Pause" @click="pause" />
        <Button v-else label="Click to Play" @click="gameLoop();resume();" />
    </div>
    
</template>
<style>
.gameSelection:has(input[type="radio"]:checked) {
    background-color: var(--indigo-50) !important;
    color: var(--indigo-700);
}

.loading-container {
    width: calc(95vw);
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    height: 10px;
    background-color: var(--blue-50);
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--blue-200);
}

.loading-bar {
    width: 0;
    height: 100%;
    background-color: var(--green-500);
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