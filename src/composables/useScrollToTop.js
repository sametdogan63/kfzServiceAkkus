export function useScrollToTop() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (selector) => {
    const target = document.querySelector(selector)
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return {
    scrollTop,
    scrollToSection
  }
}
