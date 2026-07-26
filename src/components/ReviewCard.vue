<template>
  <article class="card-hover p-8 lg:p-10 h-full flex flex-col">
    <div class="mb-6 lg:mb-8 flex items-center gap-4">
      <div class="flex h-16 w-16 lg:h-18 lg:w-18 items-center justify-center rounded-3xl bg-brand-500/15 border border-brand-500/30 text-brand-300 font-bold text-lg lg:text-xl">{{ initials }}</div>
      <div>
        <h3 class="text-lg lg:text-xl font-bold text-white">{{ name }}</h3>
        <p class="text-sm lg:text-base text-slate-400">{{ role }}</p>
      </div>
    </div>
    <p class="text-base lg:text-lg leading-relaxed text-slate-300 mb-6 lg:mb-8 flex-grow">"{{ quote }}"</p>
    <div class="flex items-center gap-1 text-amber-400">
      <span v-for="n in 5" :key="n" class="text-lg">{{ n <= rating ? '★' : '☆' }}</span>
      <span class="text-sm text-slate-400 ml-3">{{ rating }}</span>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  rating: {
    type: [Number, String],
    required: true
  },
  quote: {
    type: String,
    required: true
  }
})

const { name, rating } = props

const initials = computed(() => {
  return name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
})
</script>
