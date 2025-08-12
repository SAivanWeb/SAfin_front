import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import naive from "naive-ui";
import ApiPlugin from './plugins/api';

const app = createApp(App)
app.use(naive)
app.use(store)
app.use(router)
app.use(ApiPlugin)
app.mount('#app')
