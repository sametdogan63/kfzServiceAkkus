import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'
import { setupScrollReveal } from './composables/useScrollReveal'

const app = createApp(App)
app.use(createPinia())
app.use(router)

router.isReady().then(() => {
  app.mount('#app')
  setupScrollReveal(router)
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} • KFZ Service Akkus` : 'KFZ Service Akkus'
})
