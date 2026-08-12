<template>
  <div class="group relative flex h-full flex-col rounded-sm border border-white/15 bg-slate-900/85 p-7 shadow-[0_10px_40px_rgba(2,8,18,0.15)] transition-all duration-200 hover:border-slate-400/40 hover:bg-slate-900 lg:p-8">
    <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-brand-500/20 bg-brand-500/10 text-brand-300 transition-colors duration-200">
      <component :is="icon" class="h-8 w-8" />
    </div>
    <h3 class="mb-3 text-xl font-bold text-white lg:text-2xl">{{ title }}</h3>
    <p class="mb-6 flex-grow leading-relaxed text-slate-300">{{ description }}</p>
    <RouterLink to="/termin" class="inline-flex items-center gap-2 text-sm font-bold text-brand-300 transition hover:text-brand-200">
      <span>Termin anfragen</span>
      <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

const props = defineProps({
  title: String,
  description: String,
  icon: {
    type: [Function, Object],
    required: true
  }
})
</script>
