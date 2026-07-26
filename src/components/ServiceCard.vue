<template>
  <div class="group relative flex h-full flex-col border border-white/10 bg-slate-900/70 p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-400/50 hover:bg-slate-900 lg:p-8">
    <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-brand-500/30 bg-brand-500/10 text-brand-300 transition-colors duration-200 group-hover:bg-brand-500/20">
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
  icon: Object
})
</script>
