import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { vuetify } from './plugins/vuetify.ts'
import router from './router'
import '@mdi/font/css/materialdesignicons.css' // pekne ikonky z mdi, kompatibilne s vuetify


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')