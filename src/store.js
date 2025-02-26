import { useLocalStorage } from '@vueuse/core';

export const configValues = useLocalStorage(
    'funglish-config-values',
    {
        sound_volume: 0.3,
        transition_time: 5,
        sound: true,
    },
)

export const scoreCard = useLocalStorage(
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

export const scoreRecord = useLocalStorage(
    'funglish-word-record', []
)
