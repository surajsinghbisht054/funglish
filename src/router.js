import { createWebHashHistory, createRouter } from 'vue-router'
import WordGameView from './views/WordGame.vue';
import AboutView from './views/AboutUs.vue';
import ScoreBoardView from './views/ScoreBoard.vue';
import DictionaryView from './views/Dictionary.vue';
import ConversationView from './views/Conversation.vue';
import IdiomsView from './views/Idioms.vue';
import TwistersView from './views/Twisters.vue';
import PanelView from './views/Panel.vue';


const routes = [
  { path: '/', component: PanelView, name:'home' },
  { path: '/game/', component: WordGameView, name:'game' },
  { path: '/scoreboard/', component: ScoreBoardView, name:'scoreboard' },
  { path: '/dictionary/', component: DictionaryView, name:'dictionary' },
  { path: '/conversation/', component: ConversationView, name:'conversation' },
  { path: '/idioms/', component: IdiomsView, name:'idioms' },
  { path: '/twisters/', component: TwistersView, name:'twisters' },
  { path: '/about/', component: AboutView, name:'about' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router;