import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
// import "primeflex/themes/primeone-light.css";
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount('#app');
