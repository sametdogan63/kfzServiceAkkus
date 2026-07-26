<template>
  <section class="space-y-3">
    <div v-for="(item, index) in items" :key="index" class="overflow-hidden rounded-2xl border border-white/10 bg-white/5 card-hover transition-all duration-300">
      <button @click="toggle(index)" class="flex w-full items-center justify-between gap-4 px-6 lg:px-8 py-5 lg:py-6 text-left font-semibold text-white hover:bg-white/5">
        <span class="text-base lg:text-lg leading-relaxed">{{ item.question }}</span>
        <span class="text-brand-400 flex-shrink-0 text-xl font-light transition-transform duration-300" :class="{ 'rotate-180': activeIndex === index }">{{ activeIndex === index ? '−' : '+' }}</span>
      </button>
      <transition name="expand">
        <div v-show="activeIndex === index" class="border-t border-white/10 px-6 lg:px-8 py-5 lg:py-6 text-sm lg:text-base leading-relaxed text-slate-300 bg-white/[0.02]">
          {{ item.answer }}
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
const activeIndex = ref(null)
const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}

.expand-enter-from {
  opacity: 0;
  max-height: 0;
}

.expand-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
