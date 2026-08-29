<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppointmentForm from './components/AppointmentForm.vue'
import AppointmentTable from './components/AppointmentTable.vue'
import SearchBar from './components/SearchBar.vue'
import StatusMessage from './components/StatusMessage.vue'

const STORAGE_KEY = 'module7-appointments'

const appointments = ref([])
const search = ref('')
const editingAppointment = ref(null)
const message = ref('')
const messageType = ref('success')

const saveToStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments.value))
}

const showMessage = (text, type = 'success') => {
  message.value = text
  messageType.value = type
  setTimeout(() => { message.value = '' }, 2500)
}

const addAppointment = (appointment) => {
  appointments.value.push({ ...appointment, id: crypto.randomUUID() })
  saveToStorage()
  showMessage('Appointment added successfully.')
}

const updateAppointment = (updated) => {
  const index = appointments.value.findIndex(item => item.id === updated.id)
  if (index !== -1) appointments.value[index] = { ...updated }
  saveToStorage()
  editingAppointment.value = null
  showMessage('Appointment updated successfully.')
}

const deleteAppointment = (id) => {
  const confirmed = window.confirm('Delete this appointment?')
  if (!confirmed) return
  appointments.value = appointments.value.filter(item => item.id !== id)
  saveToStorage()
  showMessage('Appointment deleted.', 'error')
}

const startEdit = (appointment) => {
  editingAppointment.value = { ...appointment }
}

const cancelEdit = () => {
  editingAppointment.value = null
}

const markCompleted = (id) => {
  const index = appointments.value.findIndex(item => item.id === id)
  if (index !== -1) {
    appointments.value[index].status = 'Completed'
    saveToStorage()
    showMessage('Appointment marked as completed.')
  }
}

const filteredAppointments = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return appointments.value
  return appointments.value.filter(item =>
    item.clientName.toLowerCase().includes(term) ||
    item.service.toLowerCase().includes(term)
  )
})

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  appointments.value = saved ? JSON.parse(saved) : []
})
</script>

<template>
  <main class="relative min-h-screen overflow-hidden bg-slate-950 p-4 md:p-8">
    <!-- Ambient glow orbs -->
    <div class="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]"></div>
    <div class="pointer-events-none absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]"></div>
    <div class="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-pink-500/10 blur-[100px]"></div>

    <section class="relative z-10 mx-auto max-w-5xl">
      <AppHeader />

      <StatusMessage :message="message" :type="messageType" />

      <div class="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <AppointmentForm
          :editing-appointment="editingAppointment"
          @save="editingAppointment ? updateAppointment($event) : addAppointment($event)"
          @cancel="cancelEdit"
        />
      </div>

      <div class="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <SearchBar v-model="search" />
        <AppointmentTable
          :appointments="filteredAppointments"
          @edit="startEdit"
          @remove="deleteAppointment"
          @complete="markCompleted"
        />
      </div>
    </section>
  </main>
</template>