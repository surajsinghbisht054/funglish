import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import router from './router';
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false || 'none',
        }
    }
}).use(router);

app.mount('#app');
