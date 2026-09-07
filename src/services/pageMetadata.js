import { businessInfo } from '../config/businessInfo'
import logo from '../assets/kfz-service-akkus-logo.png'

export function normalizeSiteUrl(value) {
  if (!value) return ''
  const url = new URL(value)
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('VITE_SITE_URL muss eine HTTPS-Domain ohne Pfad, Zugangsdaten oder Parameter sein.')
  }
  return url.origin
}

export const seoConfig = {
  siteUrl: normalizeSiteUrl(import.meta.env.VITE_SITE_URL),
  noindex: import.meta.env.VITE_NOINDEX === 'true'
}

export function applyPageMetadata(route, documentRef = document, config = seoConfig) {
  const metadata = route.meta
  const title = route.path === '/' ? metadata.title : `${metadata.title} | ${businessInfo.name}`
  const noindex = config.noindex || metadata.noindex || !config.siteUrl
  const canonicalUrl = config.siteUrl && !metadata.noindex ? new URL(route.path, config.siteUrl).href : ''
  const imageUrl = config.siteUrl ? new URL(logo, config.siteUrl).href : ''
  documentRef.title = title

  const setMeta = (attribute, key, value) => {
    let element = documentRef.head.querySelector(`meta[${attribute}="${key}"]`)
    if (!value) {
      element?.remove()
      return
    }
    if (!element) {
      element = documentRef.createElement('meta')
      element.setAttribute(attribute, key)
      documentRef.head.append(element)
    }
    element.setAttribute('content', value)
  }

  setMeta('name', 'description', metadata.description)
  setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', metadata.description)
  setMeta('property', 'og:type', 'website')
  setMeta('property', 'og:locale', 'de_DE')
  setMeta('property', 'og:site_name', businessInfo.name)
  setMeta('property', 'og:url', canonicalUrl)
  setMeta('property', 'og:image', imageUrl)
  setMeta('property', 'og:image:alt', imageUrl ? `${businessInfo.name} – Meisterbetrieb` : '')
  setMeta('name', 'twitter:card', 'summary')
  setMeta('name', 'twitter:title', title)
  setMeta('name', 'twitter:description', metadata.description)
  setMeta('name', 'twitter:image', imageUrl)

  let canonical = documentRef.head.querySelector('link[rel="canonical"]')
  if (canonicalUrl) {
    if (!canonical) {
      canonical = documentRef.createElement('link')
      canonical.rel = 'canonical'
      documentRef.head.append(canonical)
    }
    canonical.href = canonicalUrl
  } else {
    canonical?.remove()
  }

  documentRef.getElementById('business-schema')?.remove()
  if (route.path === '/') {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'AutoRepair',
      name: businessInfo.name,
      telephone: businessInfo.telephone,
      email: businessInfo.email,
      address: { '@type': 'PostalAddress', streetAddress: businessInfo.street, postalCode: businessInfo.postalCode, addressLocality: businessInfo.city, addressCountry: businessInfo.country },
      openingHoursSpecification: businessInfo.openingHours.map((hours) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: hours.days, opens: hours.opens, closes: hours.closes })),
      ...(config.siteUrl ? { url: config.siteUrl, image: imageUrl, '@id': `${config.siteUrl}/#business` } : {})
    }
    const script = documentRef.createElement('script')
    script.id = 'business-schema'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(structuredData).replace(/</g, '\\u003c')
    documentRef.head.append(script)
  }
}