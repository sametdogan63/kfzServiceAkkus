import { execFileSync } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { JSDOM } from 'jsdom'

const vite = resolve('node_modules/vite/bin/vite.js')
execFileSync(process.execPath, [vite, 'build'], { stdio: 'inherit' })
execFileSync(process.execPath, [vite, 'build', '--ssr', 'src/entry-server.js', '--outDir', '.prerender'], { stdio: 'inherit' })

const { render, publicPaths, applyPageMetadata, seoConfig } = await import(pathToFileURL(resolve('.prerender/entry-server.js')).href)
const template = await readFile('dist/index.html', 'utf8')

if (!seoConfig.siteUrl) {
  console.warn('VITE_SITE_URL fehlt: kein Canonical und keine Sitemap; Seiten bleiben noindex. Vor dem Livegang die echte Domain setzen.')
}

for (const path of [...publicPaths, '/intern/termine', '/404']) {
  const page = new JSDOM(template)
  const { document } = page.window
  const { html, route } = await render(path)
  document.getElementById('app').innerHTML = html
  applyPageMetadata(route, document)
  const file = resolve('dist', path === '/' ? 'index.html' : `${path.slice(1)}.html`)
  await mkdir(resolve(file, '..'), { recursive: true })
  await writeFile(file, page.serialize())
  page.window.close()
}

const robots = ['User-agent: *', 'Allow: /', 'Disallow: /intern/']
if (seoConfig.siteUrl && !seoConfig.noindex) {
  const page = new JSDOM()
  const sitemap = page.window.document.implementation.createDocument('http://www.sitemaps.org/schemas/sitemap/0.9', 'urlset')
  for (const path of publicPaths) {
    const entry = sitemap.createElementNS(sitemap.documentElement.namespaceURI, 'url')
    const location = sitemap.createElementNS(sitemap.documentElement.namespaceURI, 'loc')
    location.textContent = new URL(path, seoConfig.siteUrl).href
    entry.append(location)
    sitemap.documentElement.append(entry)
  }
  await writeFile('dist/sitemap.xml', new page.window.XMLSerializer().serializeToString(sitemap))
  robots.push(`Sitemap: ${seoConfig.siteUrl}/sitemap.xml`)
  page.window.close()
}
await writeFile('dist/robots.txt', `${robots.join('\n')}\n`)
console.log(`Prerendered ${publicPaths.length} public pages, the login page and the 404 page.`)