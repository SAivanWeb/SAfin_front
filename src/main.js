import './assets/main.scss'
import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import naive, { NMessageProvider } from 'naive-ui'
import ApiPlugin from './plugins/api';

const app = createApp({
    render: () => h(NMessageProvider, null, { default: () => h(App) })
})

app.use(naive)
app.use(store)
app.use(router)
app.use(ApiPlugin)
app.mount('#app')
