import { beforeEach, describe, expect, it } from 'vitest'
import { applyPageMetadata, normalizeSiteUrl } from '../src/services/pageMetadata'
import { pageMetadata, publicPaths } from '../src/config/pageMetadata'

const config = { siteUrl: 'https://workshop.example', noindex: false }
beforeEach(() => { document.head.innerHTML = '' })

describe('page metadata', () => {
  it('assigns distinct descriptions, titles and canonical URLs', () => {
    for (const path of publicPaths) {
      applyPageMetadata({ path, meta: pageMetadata[path] }, document, config)
      expect(document.querySelector('link[rel="canonical"]').href).toBe(new URL(path, config.siteUrl).href)
      expect(document.querySelector('meta[name="description"]').content).toBe(pageMetadata[path].description)
      expect(document.title).toContain(pageMetadata[path].title)
    }
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
  })

  it('only includes verified business schema on the home page', () => {
    applyPageMetadata({ path: '/', meta: pageMetadata['/'] }, document, config)
    const schema = JSON.parse(document.getElementById('business-schema').textContent)
    expect(schema['@type']).toBe('AutoRepair')
    expect(schema.address.addressLocality).toBe('Essen')
    expect(schema.aggregateRating).toBeUndefined()
    applyPageMetadata({ path: '/kontakt', meta: pageMetadata['/kontakt'] }, document, config)
    expect(document.getElementById('business-schema')).toBeNull()
  })

  it('does not index the admin area or unconfigured deployments', () => {
    applyPageMetadata({ path: '/intern/termine', meta: pageMetadata['/intern/termine'] }, document, config)
    expect(document.querySelector('meta[name="robots"]').content).toContain('noindex')
    expect(document.querySelector('link[rel="canonical"]')).toBeNull()
    applyPageMetadata({ path: '/', meta: pageMetadata['/'] }, document, { siteUrl: '' })
    expect(document.querySelector('meta[name="robots"]').content).toContain('noindex')
    expect(document.querySelector('meta[property="og:image"]')).toBeNull()
  })

  it('validates the canonical domain instead of accepting arbitrary URLs', () => {
    expect(normalizeSiteUrl('https://workshop.example/')).toBe('https://workshop.example')
    expect(() => normalizeSiteUrl('http://workshop.example')).toThrow()
    expect(() => normalizeSiteUrl('https://workshop.example/kontakt')).toThrow()
  })
})