import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const cookiesAccepted = ref(localStorage.getItem('cookiesAccepted') === 'true')
  const showScrollButton = ref(false)

  const acceptCookies = () => {
    cookiesAccepted.value = true
    localStorage.setItem('cookiesAccepted', 'true')
  }

  const setScrollButtonVisible = (visible) => {
    showScrollButton.value = visible
  }

  return {
    cookiesAccepted,
    showScrollButton,
    acceptCookies,
    setScrollButtonVisible
  }
})
