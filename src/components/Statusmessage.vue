<script setup>
defineProps({ message: String, type: { type: String, default: 'success' } })
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-1"
    leave-active-class="transition duration-150 ease-in"
    leave-to-class="opacity-0 -translate-y-1"
  >
    <div
      v-if="message"
      class="mt-4 rounded-xl border p-3 text-sm backdrop-blur-xl"
      :class="type === 'success'
        ? 'border-green-400/30 bg-green-400/10 text-green-300 shadow-[0_0_20px_rgba(74,222,128,0.15)]'
        : 'border-red-400/30 bg-red-400/10 text-red-300 shadow-[0_0_20px_rgba(248,113,113,0.15)]'"
    >
      {{ message }}
    </div>
  </Transition>
</template>