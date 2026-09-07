import { createRouter, createWebHistory } from 'vue-router'
import { pageMetadata } from '../config/pageMetadata'

const HomePage = () => import('../pages/HomePage.vue')
const ServicesPage = () => import('../pages/ServicesPage.vue')
const AboutPage = () => import('../pages/AboutPage.vue')
const AppointmentPage = () => import('../pages/AppointmentPage.vue')
const ContactPage = () => import('../pages/ContactPage.vue')
const ReviewsPage = () => import('../pages/ReviewsPage.vue')
const FAQPage = () => import('../pages/FAQPage.vue')
const AppointmentAdminPage = () => import('../pages/AppointmentAdminPage.vue')
const ImprintPage = () => import('../pages/ImprintPage.vue')
const PrivacyPage = () => import('../pages/PrivacyPage.vue')
const CookiePolicyPage = () => import('../pages/CookiePolicyPage.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { title: 'Startseite' }
  },
  {
    path: '/leistungen',
    name: 'Services',
    component: ServicesPage,
    meta: { title: 'Leistungen' }
  },
  {
    path: '/ueber-uns',
    name: 'About',
    component: AboutPage,
    meta: { title: 'Über uns' }
  },
  {
    path: '/termin',
    name: 'Appointment',
    component: AppointmentPage,
    meta: { title: 'Termin' }
  },
  {
    path: '/kontakt',
    name: 'Contact',
    component: ContactPage,
    meta: { title: 'Kontakt' }
  },
  {
    path: '/bewertungen',
    name: 'Reviews',
    component: ReviewsPage,
    meta: { title: 'Bewertungen' }
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQPage,
    meta: { title: 'FAQ' }
  },
  {
    path: '/intern/termine',
    name: 'AppointmentAdmin',
    component: AppointmentAdminPage,
    meta: { title: 'Terminverwaltung' }
  },
  {
    path: '/impressum',
    name: 'Imprint',
    component: ImprintPage,
    meta: { title: 'Impressum' }
  },
  {
    path: '/datenschutz',
    name: 'Privacy',
    component: PrivacyPage,
    meta: { title: 'Datenschutz' }
  },
  {
    path: '/cookies',
    name: 'CookiePolicy',
    component: CookiePolicyPage,
    meta: { title: 'Cookie-Richtlinie' }
  }
]

export function createAppRouter(history = createWebHistory(import.meta.env.BASE_URL)) {
  return createRouter({
    history,
    routes: [
      ...routes.map((route) => ({ ...route, meta: pageMetadata[route.path] })),
      { path: '/:pathMatch(.*)*', component: () => import('../pages/NotFoundPage.vue'), meta: { title: 'Seite nicht gefunden', description: 'Diese Seite ist nicht verfügbar.', noindex: true } }
    ],
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition
      return to.hash === '#main-content' ? { el: '#main-content', top: 96 } : { top: 0, behavior: 'instant' }
    }
  })
}
