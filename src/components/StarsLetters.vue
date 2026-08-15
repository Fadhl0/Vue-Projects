<template>
  <div class="stars">
    <div class="star" v-for="(val, i) in stars.getAllStars" :key="i"
      :style="{ top: val.position.y + '%', left: val.position.x + '%' }">
      {{ val.letter }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStarsStore } from '@/stores/stars';

const stars = useStarsStore()
</script>

<style scoped>
@reference '../assets/main.css';

.stars {
  @apply absolute inset-0 pointer-events-none z-0;
}

.star {
  filter: drop-shadow(2px 4px 6px var(--color-read));

  @apply absolute text-read -translate-y-4;
}
</style>
