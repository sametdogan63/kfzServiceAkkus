<template>
  <div class="group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8 shadow-[0_14px_44px_rgba(2,6,23,0.24)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-[0_24px_70px_rgba(2,6,23,0.35)] lg:p-10">
    <div class="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"></div>
    <div class="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-500/30 bg-brand-500/10 text-brand-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-500/20">
      <component :is="icon" class="h-8 w-8" />
    </div>
    <h3 class="mb-3 text-xl font-bold text-white lg:text-2xl">{{ title }}</h3>
    <p class="mb-6 flex-grow leading-relaxed text-slate-300">{{ description }}</p>
    <RouterLink to="/leistungen" class="btn-secondary inline-flex">
      <span>Mehr erfahren</span>
      <svg class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  title: String,
  description: String,
  icon: Object
})
</script>
