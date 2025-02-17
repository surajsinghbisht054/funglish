<script setup>
import { ref, watch } from 'vue';
import word_translations from './words.json';

const all_english_words = Object.keys(word_translations);

const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * all_english_words.length);
    return all_english_words[randomIndex];
};

const getRandomTranslation = (word) => {
    const [hindi, chineses, russian] = word_translations[word];
    return { hindi, chineses, russian };
};

const screenPointer = ref(1);
const scoreCardStorageKey = 'funglish-score-card';
const scoreCard = ref(localStorage.getItem(scoreCardStorageKey) || {
    correct: 0,
    wrong: 0,
    skipped: 0,
    total: 0,
    accuracy: 0,
});
// Watch for changes and update localStorage
watch(scoreCard, (newValue) => {
  localStorage.setItem(scoreCardStorageKey, newValue);
});

const resetScore = () => {
    scoreCard.value.correct = 0;
    scoreCard.value.wrong = 0;
    scoreCard.value.skipped = 0;
    scoreCard.value.total = 0;
    scoreCard.value.accuracy = 0;
};
const updateScore = (type) => {
    scoreCard.value[type] += 1;
    scoreCard.value.total += 1;
    scoreCard.value.accuracy = Math.round((scoreCard.value.correct / scoreCard.value.total) * 100);
};
const showBoardData = ref({
    correctWord: '',
    translation: {},
    words: [],
    userSelectedWord: '',
})
const setgameLoop = (seconds) =>{
    if(window.gameLoop){
        clearInterval(window.gameLoop);
    }
    window.gameLoop = setInterval(() => {
        if(showBoardData.value.correctWord && showBoardData.value.userSelectedWord === ''){
            updateScore('skipped');
        }else if(showBoardData.value.correctWord && showBoardData.value.userSelectedWord === showBoardData.value.correctWord){
            updateScore('correct');
        }else if (showBoardData.value.correctWord && showBoardData.value.userSelectedWord !== showBoardData.value.correctWord){
            updateScore('wrong');
        }
        
        const correctWord = getRandomWord();
        const correctWordTranslation = getRandomTranslation(correctWord);
        const words = [getRandomWord(), getRandomWord(), getRandomWord(), getRandomWord(), getRandomWord(), correctWord];
        // Shuffle the words
        words.sort(() => Math.random() - 0.5);
        showBoardData.value = {
            translation: correctWordTranslation,
            userSelectedWord: '',
            correctWord,
            words,
        };
    }, seconds);
}
watch(screenPointer, (newValue) => {
    if(newValue === 0){
        setgameLoop(4000);
    }else{
        clearInterval(window.gameLoop);
    }
});
</script>

<template>
    <div class="surface-0" style="padding-bottom: 4.5rem;">
        <!-- Game -->
        <div v-show="screenPointer === 0">
            <div class="w-full surface-100 text-center text-2xl font-semibold p-2">
                {{ showBoardData.translation.hindi||'-- Starting --' }}
            </div>
            <div class="w-full flex flex-wrap gap-8 p-4 my-auto">
                <label v-for="word in showBoardData.words" :key="word" @click="showBoardData.userSelectedWord = word" class="gameSelection capitalize shadow-1 border-1 border-200 font-semibold text-2xl p-4 border-round bg-indigo-50 cursor-pointer">
                    <span >{{ word }}</span>
                    <input type="radio" name="gameSelection" class="hidden" />
                </label>

            </div>
        </div>
        <!-- ScoreBoard -->
        <div v-show="screenPointer === 1">
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
        <Button class="text-3xl" icon="pi pi-play-circle" variant="text" severity="secondary" @click="screenPointer = 0" />
        <Button class="text-3xl" icon="pi pi-clipboard" variant="text" severity="secondary" @click="screenPointer = 1" />
        <Button class="text-3xl" icon="pi pi-user" variant="text" severity="secondary" @click="screenPointer = 2" />
    </div>
</template>
<style>
body {
    background-color: var(--p-surface-0);
}
.gameSelection:has(input[type="radio"]:checked) {
    background-color: var(--p-indigo-500) !important;
    color: var(--p-surface-0);
}
</style>