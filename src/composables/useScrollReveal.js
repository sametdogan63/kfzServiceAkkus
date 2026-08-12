const REVEAL_SELECTOR = [
  'main section',
  'main .card-hover',
  'main .glass-card',
  'main .cta-panel'
].join(', ')

const isReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const markVisible = (element) => {
  element.classList.add('reveal-ready', 'reveal-visible')
}

const markRevealCandidate = (element) => {
  if (element.classList.contains('reveal-ready')) {
    return
  }

  const viewportTrigger = window.innerHeight * 0.9
  const rect = element.getBoundingClientRect()

  element.classList.add('reveal-ready')

  // Keep above-the-fold content immediately visible to avoid flicker on load.
  if (rect.top <= viewportTrigger) {
    element.classList.add('reveal-visible')
  }
}

export const setupScrollReveal = (router) => {
  if (typeof window === 'undefined') {
    return
  }

  let observer

  const run = () => {
    const targets = Array.from(document.querySelectorAll(REVEAL_SELECTOR))

    if (!targets.length) {
      return
    }

    if (isReducedMotion()) {
      targets.forEach(markVisible)
      return
    }

    if (observer) {
      observer.disconnect()
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add('reveal-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -10% 0px'
      }
    )

    targets.forEach((element) => {
      markRevealCandidate(element)
      if (!element.classList.contains('reveal-visible')) {
        observer.observe(element)
      }
    })
  }

  const scheduleRun = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(run)
    })
  }

  scheduleRun()
  router.afterEach(() => {
    scheduleRun()
  })
}
