import { createApp, createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createAppRouter } from './router'
import { applyPageMetadata } from './services/pageMetadata'
import './index.css'

const isLegacyNavigation = window.location.hash.startsWith('#/')
if (isLegacyNavigation) {
  const legacyPath = window.location.hash.slice(1)
  window.history.replaceState(null, '', legacyPath.startsWith('//') ? '/' : legacyPath)
}

const router = createAppRouter()
const app = document.getElementById('app').hasChildNodes() && !isLegacyNavigation ? createSSRApp(App) : createApp(App)
app.use(createPinia())
app.use(router)

router.afterEach((to) => {
  applyPageMetadata(to)
})

router.isReady().then(() => {
  applyPageMetadata(router.currentRoute.value)
  app.mount('#app')
})
