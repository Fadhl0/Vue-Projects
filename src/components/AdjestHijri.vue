<template>
  <div class="container">
    <button class="decreament" @click="adject.decreament()">-</button>
    <span class="adject">{{ adject.getAdject }}</span>
    <button class="increament" @click="adject.increament()">+</button>
  </div>
</template>

<script setup lang="ts">
import { useAdjectStore } from '@/stores/adjestTime';
import { toRef } from 'vue';

const adject = toRef(useAdjectStore());
</script>

<style scoped>
@reference "../assets/main.css";

.container {
  @apply flex flex-row-reverse flex-nowrap gap-1 font-mono items-center
}

.container>* {
  @apply border-2 rounded-full border-gold-700 text-center;
}

span {
  @apply text-2xl px-1 pt-2 text-gold-400 h-13.5 w-13.5
}

button {
  @apply text-xl py-2 px-4 cursor-pointer hover:bg-gold-400/20 transition-colors duration-200
}
</style>
