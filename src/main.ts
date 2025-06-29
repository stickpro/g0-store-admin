import { createPinia } from 'pinia'

import { createApp } from 'vue'

import { intiRequests } from '@/utils/helpers/init'

import App from './App.vue'
import './assets/index.css'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.globalProperties.$appFrontend = import.meta.env.VITE_FRONTEND_URL
app.config.globalProperties.$fileStorageUrl = import.meta.env.VITE_FILE_STORAGE_URL

intiRequests().then(() => app.mount('#app'))
