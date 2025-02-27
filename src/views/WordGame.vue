<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useWakeLock } from '@vueuse/core';
import dictionary from '../data/dictionary.json';
import BackgroundSound from '../data/background.mp3';
import ChangeSound from '../data/change.wav';
import CorrectSound from '../data/correct.wav';
import WrongSound from '../data/wrong.mp3';
import {Howl} from 'howler';
import { useCountdown } from '@vueuse/core';
import {configValues, scoreCard, scoreRecord} from '../store';

// sound
const bg_sound = new Howl({
  src: [BackgroundSound],
  loop: true,
  html5: true,
  volume: configValues.value?.sound_volume || 0,
});
const change_sound = new Howl({html5: true, src: [ChangeSound], volume: configValues.value?.sound_volume || 0});
const correct_sound = new Howl({html5: true, src: [CorrectSound], volume: configValues.value?.sound_volume || 0});
const wrong_sound = new Howl({html5: true, src: [WrongSound], volume:configValues.value?.sound_volume || 0});
const wordKeys = Object.keys(dictionary);

const gameIsRunning = ref(false);

onMounted(() => {
    const { request } = useWakeLock()
    request('screen');
})
onUnmounted(() => {
    bg_sound.stop();
    const { release } = useWakeLock()
    release('screen');
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

const gameContext = ref({
    correctWord: '',
    translation: {},
    words: [],
    userSelectedWord: '',
})


const updateScore = (type) => {
    scoreCard.value.lastWord = gameContext.value?.translation;
    scoreCard.value[type] += 1;
    scoreCard.value.total += 1;
    scoreCard.value.accuracy = Math.round((scoreCard.value.correct / scoreCard.value.total) * 100);
};

const gameLoop = () => {
    // update score
    if (gameContext.value.correctWord && gameContext.value.userSelectedWord === '') {
        updateScore('skipped');
    } else if (gameContext.value.correctWord && gameContext.value.userSelectedWord === gameContext.value.correctWord) {
        updateScore('correct');
        if(configValues.value.sound)correct_sound.play();
    } else if (gameContext.value.correctWord && gameContext.value.userSelectedWord !== gameContext.value.correctWord) {
        updateScore('wrong');
        if(configValues.value.sound)wrong_sound.play();
    }

    const correctWord = getRandomWord();
    const correctWordTranslation = getWordTranslation(correctWord);
    scoreRecord.value.push(correctWordTranslation);
    const words = [getRandomWord(), getRandomWord(), getRandomWord(), getRandomWord(), correctWord];
    words.sort(() => Math.random() - 0.5);

    gameContext.value = {
        translation: correctWordTranslation,
        userSelectedWord: '',
        correctWord,
        words,
    };
    if(configValues.value.sound)change_sound.play();
    
}
const progressBarWidth = ref(0);
const counter = useCountdown(configValues.value.transition_time, {
  onComplete() {
    gameLoop();
    counter.start(configValues.value.transition_time);
  },
  onTick() {
    progressBarWidth.value = `${100 - Math.round((counter.remaining.value/configValues.value.transition_time)*100)}%`;
  },
  immediate: false
});
watch(gameIsRunning, (newState) => {
    if (newState) {
        if(configValues.value.sound)bg_sound.play();
        gameLoop();
        counter.start(configValues.value.transition_time);
    }else{
        counter.pause();
        bg_sound.stop();

    }
});

</script>

<template>
    <div class="flex justify-content-between align-items-center px-1">
        <span class="p-2 cursor-pointer" @click="$router.push({name:'home' })"><i class="pi pi-arrow-left"></i></span>
        <h2 class="text-center">Game</h2>
        <span  class="p-3"></span>
    </div>
    <div class="flex justify-content-between my-2">
        <div>Score</div>
        <div class="flex gap-2 justify-content-end">
            {{ scoreCard.correct }}/{{ scoreCard.total }}
        </div>
    </div>
    <div v-if="!gameContext.translation?.e?.length" class="text-center">
        <h3>Instructions</h3>
        <div>
            Game will show you a word in hindi and you have to select the correct translation in English.<br>
            For each correct answer you will get 1 point. <br>
            For each wrong answer you will get -1 point. <br>
            For each skipped answer you will get 0 point. <br>
            One word will be shown for 4 seconds. <br>
        </div>
    </div>
    <Card v-else>
        <template #header>
            <div class="pt-3 pl-3 text-sm text-400">Select the correct word</div>
        </template>
        <template #title>
            <p v-for="word in gameContext.translation.e" :key="word" class="m-1">{{ word }}</p>
        </template>

        <template #content>
            <div class="w-full flex flex-wrap gap-3 md:gap-8">
                <label v-for="word in gameContext.words" :key="word" @click="gameContext.userSelectedWord = word"
                    class="checkbox-input gameSelection animate__animated font-semibold animate__rollIn animate__fast capitalize p-2 md:p-4 bg-indigo-50 border-round cursor-pointer">
                    <span>{{ word }}</span>
                    <input type="radio" name="gameSelection" class="hidden" />
                </label>
            </div>
        </template>
        <template #footer>
            <div class="loading-container my-2" :key="scoreCard.lastWord">
                <div class="loading-bar" :style="{width:progressBarWidth}"></div>
            </div>
        </template>
    </Card>
    <div class="flex align-items-center justify-content-center gap-2 p-4">
        <Button v-if="gameIsRunning" label="Click to Pause" @click="gameIsRunning=!gameIsRunning" />
        <Button v-else label="Click to Play"  @click="gameIsRunning=!gameIsRunning" />
    </div>

    <Card v-if="scoreCard.lastWord">
        <template #header>
            <div class="pt-3 pl-3 text-sm text-400">Previous Word</div>
        </template>
        <template #title>
            {{ scoreCard.lastWord?.w?.join(',') }}
        </template>
        <template #content>
            <div>{{ scoreCard.lastWord?.p }}</div>
            <div v-for="word in scoreCard.lastWord?.e" :key="word">{{ word }}</div>
        </template>
    </Card>
    

</template>
<style>
.gameSelection:has(input[type="radio"]:checked) {
    background-color: var(--p-indigo-200) !important;
    color: var(--p-blue-900);
    
}

.loading-container {
    width: 100%;
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
    height: 100%;
    background-color: var(--p-green-500);
    animation: load 5s linear forwards;
}


</style>