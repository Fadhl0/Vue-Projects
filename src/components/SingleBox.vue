<template>
  <div :class="['box', color, { 'rounded-left': index === 4 }, { 'rounded-right': index === 0 }]"
    :style="{ transitionDelay: `${index * 200}ms` }">
    <span class="letter">
      <span>
        <span v-if="typeof key[0] === 'number'" :style="`padding-right: ${key[0]}px`"></span>
        <span v-else>{{ key[0] }}</span>
      </span>
      <span>{{ key[1] }}</span>
      <span>
        <span v-if="typeof key[2] === 'number'" :style="`padding-right: ${key[2]}px`"></span>
        <span v-else>{{ key[2] }}</span>
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { connecter } from '@/composables/connecter';
import { computed } from 'vue';
const prop = defineProps<{ letter: string, index: number, previous: string | null, color: string }>();

const key = computed(() => connecter(prop.letter, prop.index, prop.previous));

</script>


<style scoped>
@reference '../assets/main.css';

* {
  @apply transition-all duration-200;
}

.box {
  @apply relative w-16 h-16 border-r border-y border-read/50 text-read overflow-hidden mb-1;
}

span.letter {
  @apply absolute top-2/4 left-2/4 -translate-2/4 text-5xl;
}

.rounded-left {
  @apply rounded-l-lg border;
}

.rounded-right {
  @apply rounded-r-lg border-y border-r;
}
</style>
