<template>
  <div class="lose">
    <span>الكلمة هي:</span>
    <span>{{ storage.currentWord?.word }}</span>
  </div>
</template>

<script setup lang="ts">
import { useWordleStore } from '@/stores/wordStore';

const storage = useWordleStore()
</script>

<style scoped>
@reference '../assets/main.css';

.lose {
  @apply w-fit mx-auto text-5xl pt-10 text-read;
}

.lose span:nth-child(2) {
  @apply font-molhim pr-2.5;
}
</style>
