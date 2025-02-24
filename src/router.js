import { createMemoryHistory, createRouter } from 'vue-router'
import WordGameView from './views/WordGame.vue';
import AboutView from './views/AboutUs.vue';
import ScoreBoardView from './views/ScoreBoard.vue';
import DictionaryView from './views/Dictionary.vue';

const routes = [
  { path: '/', component: WordGameView, name:'home' },
  { path: '/about/', component: AboutView, name:'about' },
  { path: '/scoreboard/', component: ScoreBoardView, name:'scoreboard' },
  { path: '/dictionary/', component: DictionaryView, name:'dictionary' },
  
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
export default router;