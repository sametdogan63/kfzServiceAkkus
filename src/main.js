import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} • KFZ Service Akkus` : 'KFZ Service Akkus'
})
