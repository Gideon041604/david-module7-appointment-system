<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  editingAppointment: { type: Object, default: null }
})
const emit = defineEmits(['save', 'cancel'])

const blankForm = () => ({
  clientName: '',
  service: '',
  appointmentDate: '',
  appointmentTime: '',
  status: 'Pending'
})

const form = reactive(blankForm())

watch(() => props.editingAppointment, (newVal) => {
  if (newVal) {
    Object.assign(form, newVal)
  } else {
    Object.assign(form, blankForm())
  }
}, { immediate: true })

const submitForm = () => {
  if (!form.clientName.trim() || !form.service.trim() || !form.appointmentDate || !form.appointmentTime) {
    return
  }
  emit('save', { ...form })
  if (!props.editingAppointment) {
    Object.assign(form, blankForm())
  }
}

const cancel = () => {
  emit('cancel')
}

const inputClasses = 'mt-1 w-full rounded-lg border border-white/20 bg-white/10 p-2 text-white placeholder-slate-400 outline-none transition focus:border-cyan-400/70 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400/30'
const labelClasses = 'text-sm font-semibold text-slate-100'
</script>

<template>
  <form @submit.prevent="submitForm" class="grid gap-4 md:grid-cols-2">
    <label class="block">
      <span :class="labelClasses">Client name</span>
      <input v-model="form.clientName" type="text" :class="inputClasses" placeholder="Juan Dela Cruz" />
    </label>

    <label class="block">
      <span :class="labelClasses">Service</span>
      <input v-model="form.service" type="text" :class="inputClasses" placeholder="Consultation" />
    </label>

    <label class="block">
      <span :class="labelClasses">Date</span>
      <input v-model="form.appointmentDate" type="date" :class="[inputClasses, 'accent-cyan-400 [color-scheme:dark]']" />
    </label>

    <label class="block">
      <span :class="labelClasses">Time</span>
      <input v-model="form.appointmentTime" type="time" :class="[inputClasses, 'accent-cyan-400 [color-scheme:dark]']" />
    </label>

    <label class="block md:col-span-2">
      <span :class="labelClasses">Status</span>
      <select v-model="form.status" :class="[inputClasses, '[color-scheme:dark]']">
        <option>Pending</option>
        <option>Confirmed</option>
        <option>Completed</option>
        <option>Cancelled</option>
      </select>
    </label>

    <div class="flex gap-3 md:col-span-2">
      <button
        type="submit"
        class="rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2 font-medium text-white shadow-lg shadow-cyan-500/25 transition hover:from-cyan-400 hover:to-purple-500 hover:shadow-cyan-400/40"
      >
        {{ editingAppointment ? 'Save Changes' : 'Add Appointment' }}
      </button>
      <button
        v-if="editingAppointment"
        type="button"
        @click="cancel"
        class="rounded-lg border border-white/20 bg-white/10 px-5 py-2 font-medium text-slate-100 transition hover:bg-white/20"
      >
        Cancel
      </button>
    </div>
  </form>
</template>