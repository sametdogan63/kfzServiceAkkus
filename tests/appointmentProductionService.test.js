import { describe, expect, it, vi } from 'vitest'
import { submitAppointment } from '../src/services/appointmentProductionService'
import { requireSupabase } from '../src/services/supabaseClient'

vi.mock('../src/services/supabaseClient', () => ({ requireSupabase: vi.fn() }))

describe('appointment data', () => {
  it('sends missing optional fields as null, not an invalid year zero', async () => {
    const rpc = vi.fn().mockResolvedValue({ data: { id: '123' }, error: null })
    requireSupabase.mockReturnValue({ rpc })
    const result = await submitAppointment({ name: 'Test', email: 'test@example.com', vehicle: 'VW', phone: '', model: '', year: '', service: 'Inspektion' })
    expect(result.success).toBe(true)
    expect(rpc).toHaveBeenCalledWith('submit_appointment', expect.objectContaining({ p_phone: null, p_model: null, p_year: null }))
  })

  it('turns a booking conflict into a customer-readable error', async () => {
    requireSupabase.mockReturnValue({ rpc: vi.fn().mockResolvedValue({ error: { code: '23P01' } }) })
    const result = await submitAppointment({ service: 'Inspektion' })
    expect(result.success).toBe(false)
    expect(result.error.message).toContain('inzwischen reserviert')
  })
})