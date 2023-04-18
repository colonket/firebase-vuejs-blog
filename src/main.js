import { createApp, useAttrs } from 'vue'
import App from './App.vue'

import router from "./index";
import { store } from "./store";

import "buefy/dist/buefy.css";
import "@/assets/styles.css";

const app = createApp(App)
app.use(router);
app.use(store);
const mountedApp = app.mount('#app');
