<template>
  <div class="boxs">
    <SingleBox v-for="i in 5" :key="i - 1" :index="i - 1" :letter="word[i - 1] ?? ''"
      :previous="i - 1 > 0 ? (word[i - 2] ?? null) : null" :color="colors[i - 1] ?? color" />
  </div>
</template>

<script setup lang="ts">
import SingleBox from './SingleBox.vue';

const color = 'bg-primary';

defineProps({
  word: {
    type: Array as () => string[],
    default: () => Array(5).fill("")
  },
  colors: {
    type: Array<string>,
    default: () => Array(5).fill('bg-primary'),
  },
});

</script>

<style scoped>
@reference '../assets/main.css';

.boxs {
  @apply flex flex-nowrap w-fit;
}
</style>
