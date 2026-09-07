import { expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ServiceGrid from '../src/components/ServiceGrid.vue'

it('limits the home page services and accepts functional Lucide icons', () => {
  const warning = vi.spyOn(console, 'warn').mockImplementation(() => {})
  try {
    const wrapper = mount(ServiceGrid, { props: { limit: 6 }, global: { stubs: { RouterLink: { template: '<a><slot /></a>' } } } })
    expect(wrapper.findAll('h3')).toHaveLength(6)
    expect(warning).not.toHaveBeenCalled()
    wrapper.unmount()
  } finally {
    warning.mockRestore()
  }
})