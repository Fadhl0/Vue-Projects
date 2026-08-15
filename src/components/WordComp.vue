<script setup lang="ts">
import GroupBox from '@/components/GroupBox.vue';
import { useTimerStore } from '@/stores/timer';
import { useStatusStore } from '@/stores/useStatus';
import { useWordleStore } from '@/stores/wordStore';
import { storeToRefs } from 'pinia';

const wordleStore = useWordleStore()
const { word } = storeToRefs(wordleStore);

const title = "كــــلــــمــــتــــي";

const statusStorage = useStatusStore();
const { completedGuesses } = storeToRefs(statusStorage);
const timer = useTimerStore();
</script>

<template>
  <div class="game-container">
    <h1>{{ title }}</h1>
    <p class="timer">{{ timer.time }}</p>
    <GroupBox v-for="(row, i) in word" :key="i" :word="row" :colors="completedGuesses[i] ?? []" />
  </div>
</template>

<style scoped>
@reference '../assets/main.css';

.game-container {
  @apply flex flex-col flex-nowrap items-center flex-1
}

h1 {
  @apply text-5xl text-amber-500 w-fit mx-auto mt-10 mb-5 font-molhim-bold
}
</style>
