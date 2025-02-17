import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { intiRequests } from '@/utils/helpers/init'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.globalProperties.$appFrontend = import.meta.env.VITE_FRONTEND_URL;

intiRequests().then(() => app.mount('#app'))
