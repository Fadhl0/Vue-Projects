<template>
  <div v-if="close === true">
    <div class="bg-shadow" @click="close = false"></div>
    <main>
      <div class="container">
        <button class="close" @click="close = false">
          <CloseIcon />
        </button>
        <SettingContent />
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CloseIcon from './__Icons__/CloseIcon.vue';
import SettingContent from './SettingContent.vue';

const close = ref<boolean>(false);

function changeState(state: boolean) {
  close.value = state;
}

defineExpose({ changeState })
</script>

<style scoped>
@reference "../assets/main.css";

.bg-shadow {
  @apply absolute top-0 left-0 h-screen w-screen bg-black opacity-50;
}

.container {
  @apply max-sm:overflow-hidden max-sm:w-full w-2xl max-sm:h-full h-96 absolute top-3/6 left-3/6 -translate-3/6 bg-[#232531] rounded-lg transition-all duration-200 scale-100 opacity-100 starting:scale-95 starting:opacity-50 transition-discrete;
}

button.close {
  @apply text-gray-600 hover:bg-white/10 p-1 rounded-md transition-colors ease-linear cursor-pointer;

  &:hover svg {
    @apply text-red-400;
  }
}
</style>
