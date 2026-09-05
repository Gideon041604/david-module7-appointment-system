import { describe, it, expect } from 'vitest'
import { filterAppointments, validateAppointment, canMarkCompleted } from './appointments'

describe('filterAppointments', () => {
  const appointments = [
    { id: 1, clientName: 'Juan Dela Cruz', service: 'Consultation' },
    { id: 2, clientName: 'Maria Santos', service: 'Follow-up' }
  ]

  it('matches by client name, case-insensitive', () => {
    expect(filterAppointments(appointments, 'juan')).toHaveLength(1)
  })

  it('matches by service', () => {
    expect(filterAppointments(appointments, 'follow')).toHaveLength(1)
  })

  it('returns all records when the search term is empty', () => {
    expect(filterAppointments(appointments, '')).toHaveLength(2)
  })
})

describe('validateAppointment', () => {
  it('flags missing required fields as invalid', () => {
    const result = validateAppointment({
      clientName: '',
      service: '',
      appointmentDate: '',
      appointmentTime: ''
    })
    expect(result.valid).toBe(false)
  })

  it('passes when all required fields are filled', () => {
    const result = validateAppointment({
      clientName: 'Juan Dela Cruz',
      service: 'Consultation',
      appointmentDate: '2026-09-10',
      appointmentTime: '10:00'
    })
    expect(result.valid).toBe(true)
  })
})

describe('canMarkCompleted', () => {
  it('allows marking a Pending appointment as completed', () => {
    expect(canMarkCompleted('Pending')).toBe(true)
  })

  // This test documents the expected BUSINESS RULE: a cancelled
  // appointment should never be markable as Completed.
  // It will FAIL against the current implementation — that failure
  // is our documented defect (BUG-01).
  it('does not allow marking a Cancelled appointment as completed', () => {
    expect(canMarkCompleted('Cancelled')).toBe(false)
  })
})