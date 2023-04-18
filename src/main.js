import { createApp } from 'vue';
import App from './App.vue';

import router from "./index";
import { store } from "./store";

import "buefy/dist/buefy.min.css";
import "buefy/dist/buefy.min.js";
import "@/assets/style.css";

const app = createApp(App)
app.use(router);
app.use(store);
const mountedApp = app.mount('#app');
