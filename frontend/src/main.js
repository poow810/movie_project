import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import piniaPluginPersist from 'pinia-plugin-persist'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'


// 유투브
import YouTube from 'vue3-youtube'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
pinia.use(piniaPluginPersist)
app.use(pinia)
app.use(router)

app.component('Youtube', YouTube)
app.mount('#app')