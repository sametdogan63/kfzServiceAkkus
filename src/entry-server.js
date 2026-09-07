import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { createMemoryHistory } from 'vue-router'
import { renderToString } from '@vue/server-renderer'
import App from './App.vue'
import { createAppRouter } from './router'

export { publicPaths, pageMetadata } from './config/pageMetadata'
export { applyPageMetadata, seoConfig } from './services/pageMetadata'

export async function render(path) {
  const app = createSSRApp(App)
  const router = createAppRouter(createMemoryHistory())
  app.use(createPinia())
  app.use(router)
  await router.push(path)
  await router.isReady()
  return { html: await renderToString(app), route: router.currentRoute.value }
}