// Reusable, testable logic extracted from App.vue and AppointmentTable.vue

export function filterAppointments(appointments, term) {
  const search = (term || '').trim().toLowerCase()
  if (!search) return appointments
  return appointments.filter(item =>
    item.clientName.toLowerCase().includes(search) ||
    item.service.toLowerCase().includes(search)
  )
}

export function validateAppointment(form) {
  const errors = []
  if (!form.clientName || !form.clientName.trim()) errors.push('Client name is required.')
  if (!form.service || !form.service.trim()) errors.push('Service is required.')
  if (!form.appointmentDate) errors.push('Date is required.')
  if (!form.appointmentTime) errors.push('Time is required.')
  return { valid: errors.length === 0, errors }
}

// NOTE: this matches the CURRENT behavior in AppointmentTable.vue's
// v-if="item.status !== 'Completed'" — it only blocks already-completed
// appointments. It does NOT block Cancelled appointments from being
// marked Completed, which is a logic defect we will catch with a test.
  export function canMarkCompleted(status) {
  return status !== 'Completed' && status !== 'Cancelled'
}