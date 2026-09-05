<script setup>
defineProps({ appointments: Array })
const emit = defineEmits(['edit', 'remove', 'complete'])
import { canMarkCompleted } from '../utils/appointments'
</script>

<template>
  <div class="mt-4 overflow-x-auto rounded-xl border border-white/10">
    <table class="w-full border-collapse text-left text-sm">
      <thead>
        <tr class="border-b border-white/10 bg-white/5 text-slate-100">
          <th class="p-3 font-medium">Client</th>
          <th class="p-3 font-medium">Service</th>
          <th class="p-3 font-medium">Date</th>
          <th class="p-3 font-medium">Time</th>
          <th class="p-3 font-medium">Status</th>
          <th class="p-3 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="appointments.length === 0">
          <td colspan="6" class="p-6 text-center text-slate-400">No appointments found.</td>
        </tr>
        <tr
          v-for="item in appointments"
          :key="item.id"
          class="border-b border-white/5 text-white transition hover:bg-white/5"
        >
          <td class="p-3">{{ item.clientName }}</td>
          <td class="p-3">{{ item.service }}</td>
          <td class="p-3">{{ item.appointmentDate }}</td>
          <td class="p-3">{{ item.appointmentTime }}</td>
          <td class="p-3">
            <span
              class="rounded-full border px-2.5 py-1 text-xs font-medium backdrop-blur-sm"
              :class="{
                'border-yellow-400/30 bg-yellow-400/10 text-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.15)]': item.status === 'Pending',
                'border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.15)]': item.status === 'Confirmed',
                'border-green-400/30 bg-green-400/10 text-green-300 shadow-[0_0_10px_rgba(74,222,128,0.15)]': item.status === 'Completed',
                'border-red-400/30 bg-red-400/10 text-red-300 shadow-[0_0_10px_rgba(248,113,113,0.15)]': item.status === 'Cancelled'
              }"
            >
              {{ item.status }}
            </span>
          </td>
          <td class="p-3">
            <div class="flex gap-2">
              <button
                @click="emit('edit', item)"
                class="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white transition hover:bg-white/15"
              >
                Edit
              </button>
              <button
                v-if="canMarkCompleted(item.status)"
                @click="emit('complete', item.id)"
                class="rounded-md border border-green-400/20 bg-green-400/10 px-2.5 py-1 text-xs text-green-300 transition hover:bg-green-400/20"
              >
                Complete
              </button>
              <button
                @click="emit('remove', item.id)"
                class="rounded-md border border-red-400/20 bg-red-400/10 px-2.5 py-1 text-xs text-red-300 transition hover:bg-red-400/20"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>