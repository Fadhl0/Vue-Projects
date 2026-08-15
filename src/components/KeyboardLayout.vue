<template>
  <div class="keyboard">
    <div v-for="(row, i) in arKeys" :key="i" class="keyboard-row">
      <button v-for="key in row" :key="key.id" :class="[key.color, 'key-btn', { 'enter-key': key.id === 25 }]"
        @click="store.add(key.letter)">
        <span v-if="key.id !== 13">
          {{ key.letter }}
        </span>
        <BackSpace v-else class="backspace" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useWordleStore } from '@/stores/wordStore.ts';
import BackSpace from './__icons__/BackSpace.vue';
import { storeToRefs } from 'pinia';
import { useStatusStore } from '@/stores/useStatus.ts';

const store = useWordleStore();
const status = useStatusStore();
const { arKeys } = storeToRefs(status);

</script>

<style scoped>
@reference '../assets/main.css';

.keyboard {
  @apply w-full max-w-2xl mx-auto p-2 pb-10 transition-all duration-200;
}

.keyboard-row {
  @apply flex w-full flex-row items-center gap-1 my-1 max-sm:my-0 max-sm:gap-0;
}

.key-btn {
  @apply shadow-btn flex-1 min-w-0 aspect-square flex items-center justify-center hover:opacity-85 text-read text-base sm:text-2xl cursor-pointer rounded-lg sm:rounded-xl max-sm:rounded-none;
}

.backspace {
  @apply max-sm:w-9 max-sm:h-4
}

.enter-key {
  @apply flex-[1.5] aspect-auto max-sm:h-[8.4vw] h-13.5;
}

@media (width < 40rem) {
  .keyboard-row:nth-child(1) .key-btn:nth-child(1) {
    @apply rounded-tr-xl
  }

  .keyboard-row:nth-child(1) .key-btn:nth-last-child(1) {
    @apply rounded-tl-xl
  }

  .keyboard-row:nth-last-child(1) .key-btn:nth-child(1) {
    @apply rounded-br-xl
  }

  .keyboard-row:nth-last-child(1) .key-btn:nth-last-child(1) {
    @apply rounded-bl-xl
  }
}
</style>
