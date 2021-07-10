import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/main.css'
import 'animate.css'

import AnimateTransition from './components/transitions/AnimateTransition.vue'
import AnimateTransitionGroup from './components/transitions/AnimateTransitionGroup.vue'

import { initializeFirebase } from './plugins/firebase'
initializeFirebase()

import { key, store } from './store'

createApp(App)
  .use(store, key)
  .component('animate-transition', AnimateTransition)
  .component('animate-transition-group', AnimateTransitionGroup)
  .mount('#app')
