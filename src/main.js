import { createApp, useAttrs } from 'vue'
import App from './App.vue'

import router from "./index";
import { store } from "./store";

import './assets/main.css'

createApp(App).use(router).use(store).mount('#app')
