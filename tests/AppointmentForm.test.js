import { afterEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import AppointmentForm from '../src/components/AppointmentForm.vue'
import { submitAppointment } from '../src/services/appointmentProductionService'

vi.mock('../src/services/appointmentProductionService', () => ({ submitAppointment: vi.fn() }))

const calendar = {
  name: 'AppointmentCapacityCalendar',
  template: '<div />',
  methods: { refreshDays: vi.fn() }
}

const wrappers = []
function render() {
  const wrapper = mount(AppointmentForm, {
    attachTo: document.body,
    global: { stubs: { AppointmentCapacityCalendar: calendar, RouterLink: { template: '<a><slot /></a>' } } }
  })
  wrappers.push(wrapper)
  return wrapper
}

async function completeRequiredFields(wrapper) {
  await wrapper.get('[name="name"]').setValue('Test Kunde')
  await wrapper.get('[name="email"]').setValue('test@example.com')
  await wrapper.get('[name="vehicle"]').setValue('Volkswagen')
  await wrapper.get('[name="service"]').setValue('Inspektion')
  const picker = wrapper.findComponent(calendar)
  picker.vm.$emit('update:selectedDate', '2026-09-14')
  picker.vm.$emit('update:selectedSlot', '10:00')
  await flushPromises()
}

afterEach(() => { wrappers.splice(0).forEach((wrapper) => wrapper.unmount()) })

describe('appointment request', () => {
  it('prevents duplicate requests while sending and announces success', async () => {
    let finishRequest
    submitAppointment.mockReturnValue(new Promise((resolve) => { finishRequest = resolve }))
    const wrapper = render()
    await completeRequiredFields(wrapper)
    await wrapper.get('form').trigger('submit')
    await wrapper.get('form').trigger('submit')
    expect(submitAppointment).toHaveBeenCalledTimes(1)
    expect(wrapper.get('fieldset').element.disabled).toBe(true)
    expect(wrapper.get('button[type="submit"]').text()).toContain('Wird gesendet')
    finishRequest({ success: true, appointment: { id: 'request-123' } })
    await flushPromises()
    expect(wrapper.get('[role="status"]').text()).toContain('request-123')
    expect(wrapper.get('[name="name"]').element.value).toBe('')
    expect(wrapper.get('fieldset').element.disabled).toBe(false)
  })

  it('keeps customer input after a conflict and allows retry', async () => {
    submitAppointment.mockResolvedValue({ success: false, error: new Error('Zeitraum inzwischen reserviert') })
    const wrapper = render()
    await completeRequiredFields(wrapper)
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.get('[role="alert"]').text()).toContain('inzwischen reserviert')
    expect(wrapper.get('[name="name"]').element.value).toBe('Test Kunde')
    expect(wrapper.get('fieldset').element.disabled).toBe(false)
    expect(document.activeElement.textContent).toContain('inzwischen reserviert')
  })

  it('recovers from unexpected network errors', async () => {
    submitAppointment.mockRejectedValue(new Error('Network unavailable'))
    const wrapper = render()
    await completeRequiredFields(wrapper)
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.get('[role="alert"]').text()).toContain('Verbindung')
    expect(wrapper.get('fieldset').element.disabled).toBe(false)
  })

  it('requires a date and slot, but not optional customer details', async () => {
    const wrapper = render()
    await wrapper.get('form').trigger('submit')
    expect(submitAppointment).not.toHaveBeenCalled()
    expect(document.activeElement.id).toBe('appointment-slot-error')
    for (const name of ['tel', 'model', 'year']) {
      expect(wrapper.get(`[name="${name}"]`).element.required).toBe(false)
    }
    expect(wrapper.get('[name="email"]').attributes('autocomplete')).toBe('email')
  })
})