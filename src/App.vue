<template>
  <router-view />

  <Transition leave-active-class="leave-active-class" leave-from-class="leave-from-class"
    leave-to-class="leave-to-class">
    <div v-if="isLoading" class="spinner-container">
      <div class="spinner"></div>
    </div>
  </Transition>

</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';

const isLoading = ref<boolean>(true);

onMounted(async () => {
  await nextTick()

  if (document.readyState !== 'complete') {
    await new Promise((resolve) => window.addEventListener('load', resolve))
  }

  isLoading.value = false
})
</script>

<style>
@reference "./assets/main.css";

#app {
  @apply scrollbar-thin scrollbar-thumb-gold-700 hover:scrollbar-thumb-gold-400 selection:bg-gold-400 selection:text-gold-700
}

.leave-active-class {
  @apply transition-opacity duration-500 ease-out
}

.leave-from-class {
  @apply opacity-100
}

.leave-to-class {
  @apply opacity-0
}

.spinner-container {
  @apply fixed inset-0 z-50 flex items-center justify-center bg-gold-400
}

.spinner {
  @apply h-12 w-12 animate-spin rounded-full border-4 border-gold-700 border-t-transparent
}
</style>
