import { describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import Calendar from '../src/components/AppointmentCapacityCalendar.vue'
import { getAvailabilityWindow } from '../src/services/appointmentProductionService'

vi.mock('../src/services/appointmentProductionService', () => ({ getAvailabilityWindow: vi.fn() }))

const availableDay = {
  date: '2026-09-14', capacity: 8, remaining: 8, status: 'green',
  slots: [{ value: '10:00', available: true }]
}

describe('appointment calendar', () => {
  it('does not request availability without a service', () => {
    const wrapper = mount(Calendar)
    expect(getAvailabilityWindow).not.toHaveBeenCalled()
    expect(wrapper.text()).toContain('Noch keine Leistung')
  })

  it('ignores stale responses after a service change', async () => {
    let finishOldRequest
    getAvailabilityWindow.mockReturnValueOnce(new Promise((resolve) => { finishOldRequest = resolve }))
    getAvailabilityWindow.mockResolvedValueOnce([availableDay])
    const wrapper = mount(Calendar, { props: { selectedService: 'Inspektion' } })
    await wrapper.setProps({ selectedService: 'Ölwechsel' })
    await flushPromises()
    finishOldRequest([])
    await flushPromises()
    expect(wrapper.text()).toContain('14.09.')
    expect(wrapper.attributes('aria-busy')).toBe('false')
  })

  it('announces a load error and supports retry', async () => {
    getAvailabilityWindow.mockRejectedValueOnce(new Error('Kalender nicht erreichbar'))
    getAvailabilityWindow.mockResolvedValueOnce([availableDay])
    const wrapper = mount(Calendar, { props: { selectedService: 'Inspektion' } })
    await flushPromises()
    expect(wrapper.get('[role="alert"]').text()).toContain('nicht erreichbar')
    await wrapper.get('button').trigger('click')
    await flushPromises()
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    expect(wrapper.text()).toContain('14.09.')
  })

  it('disables days without a fitting service slot and exposes selections', async () => {
    getAvailabilityWindow.mockResolvedValueOnce([
      availableDay,
      { ...availableDay, date: '2026-09-15', slots: [{ value: '10:00', available: false }] }
    ])
    const wrapper = mount(Calendar, { props: { selectedService: 'Inspektion', selectedDate: '2026-09-14', selectedSlot: '10:00' } })
    await flushPromises()
    expect(wrapper.findAll('button')[1].element.disabled).toBe(true)
    expect(wrapper.findAll('[aria-pressed="true"]')).toHaveLength(2)
  })
})