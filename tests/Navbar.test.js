import { afterEach, describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import Navbar from '../src/components/Navbar.vue'

const wrappers = []
async function render() {
  const router = createRouter({ history: createMemoryHistory(), routes: ['/', '/kontakt', '/leistungen', '/ueber-uns', '/termin'].map((path) => ({ path, component: { template: '<div />' } })) })
  await router.push('/')
  const wrapper = mount(Navbar, { attachTo: document.body, global: { plugins: [router] } })
  wrappers.push(wrapper)
  return { wrapper, router }
}

afterEach(() => { wrappers.splice(0).forEach((wrapper) => wrapper.unmount()) })

describe('mobile navigation', () => {
  it('focuses the first link and returns focus on Escape', async () => {
    const { wrapper } = await render()
    const button = wrapper.get('button[aria-controls="mobile-navigation"]')
    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('true')
    expect(document.activeElement).toBe(wrapper.get('#mobile-navigation a').element)
    await wrapper.get('#mobile-navigation a').trigger('keydown', { key: 'Escape' })
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(button.element)
  })

  it('closes when a route changes and exposes the active link', async () => {
    const { wrapper, router } = await render()
    await wrapper.get('button').trigger('click')
    await router.push('/kontakt')
    await flushPromises()
    expect(wrapper.get('button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.get('a[href="/kontakt"]').attributes('aria-current')).toBe('page')
  })

  it('closes on pointer interaction outside the navigation', async () => {
    const { wrapper } = await render()
    await wrapper.get('button').trigger('click')
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    await flushPromises()
    expect(wrapper.get('button').attributes('aria-expanded')).toBe('false')
  })
})