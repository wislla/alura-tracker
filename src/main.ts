import { createApp } from 'vue'
import App from './App.vue'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import router from './router/index'
import { key, store } from './store'

createApp(App).use(router).use(store, key).mount('#app')
