<template>
  <StarsLetters />

  <div class="error" @click.self="e => stars.addStar(e.x, e.y)">
    <h1>لا يوجد صفحة هكذا يا صديقي</h1>
    <router-link class="btn" :to="{ name: 'game' }">ارجع للعبة</router-link>
  </div>
</template>

<script setup lang="ts">
import StarsLetters from '@/components/StarsLetters.vue';
import { useStarsStore } from '@/stores/stars';
const stars = useStarsStore();
</script>

<style scoped>
@reference '../assets/main.css';

.error {
  @apply h-full flex justify-center flex-col gap-5
}

h1 {
  @apply text-read text-5xl mx-auto w-fit text-center;
}

.btn {
  @apply text-2xl
}
</style>
