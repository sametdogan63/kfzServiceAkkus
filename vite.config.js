import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), '')
  if (process.env.VERCEL_ENV === 'production' && !environment.VITE_SITE_URL) {
    throw new Error('Vor dem Produktionsdeployment VITE_SITE_URL auf die echte HTTPS-Domain setzen.')
  }
  return {
    plugins: [vue()],
    base: '/',
    define: {
      'import.meta.env.VITE_NOINDEX': JSON.stringify(process.env.VERCEL_ENV === 'preview' ? 'true' : environment.VITE_NOINDEX || 'false')
    },
    server: { port: 5173 }
  }
})
