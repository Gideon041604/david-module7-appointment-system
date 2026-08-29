<script setup>
defineProps({ modelValue: String })
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="relative">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      placeholder="Search by client name or service..."
      class="w-full rounded-lg border border-white/20 bg-white/10 p-2 pl-9 text-white placeholder-slate-400 outline-none transition focus:border-cyan-400/70 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400/30"
    />
  </div>
</template>