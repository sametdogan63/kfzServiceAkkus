import { createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import('../pages/HomePage.vue')
const ServicesPage = () => import('../pages/ServicesPage.vue')
const AboutPage = () => import('../pages/AboutPage.vue')
const AppointmentPage = () => import('../pages/AppointmentPage.vue')
const ContactPage = () => import('../pages/ContactPage.vue')
const ReviewsPage = () => import('../pages/ReviewsPage.vue')
const FAQPage = () => import('../pages/FAQPage.vue')

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
