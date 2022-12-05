import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'
import dirctives from './dirctives'

const app = createApp(App)

app.use(router)
  .use(dirctives)

app.mount('#app')
