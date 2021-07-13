import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/main.css'
import 'animate.css'

import AnimateTransition from './components/transitions/AnimateTransition.vue'
import AnimateTransitionGroup from './components/transitions/AnimateTransitionGroup.vue'

import Toast, { PluginOptions, POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
const toastOptions: PluginOptions = {
  timeout: 2000,
  position: POSITION.TOP_RIGHT,
}

import { initializeFirebase } from './plugins/firebase'
initializeFirebase()

import { key, store } from './store'

createApp(App)
  .use(store, key)
  .component('animate-transition', AnimateTransition)
  .component('animate-transition-group', AnimateTransitionGroup)
  .use(Toast, toastOptions)
  .mount('#app')
