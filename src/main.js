import { createApp } from 'vue'
import App from './App.vue'

import router from "./index";
import { store } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@/assets/style.css";

const app = createApp(App)
app.use(router);
app.use(store);
app.mount('#app');