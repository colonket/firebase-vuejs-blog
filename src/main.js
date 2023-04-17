import { createApp, useAttrs } from 'vue'
import App from './App.vue'

import router from "./index";
import { store } from "./store";

import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).use(router).use(store).mount('#app')
