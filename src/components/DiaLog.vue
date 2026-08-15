<template>
  <transition name="zoom">

    <div class="model" v-if="isOpen">

      <div class="shadow" @click="$emit('close')"></div>

      <dialog open>
        <div class="close" ref="closeBtn" @click="$emit('close')" v-if="showCloseBtn">
          <CloseIcon class="close" />
        </div>

        <transition appear name="drop" mode="in-out">
          <div :class="['title', { 'pt-5': !showCloseBtn }]">
            <div class="box">
              <span class="text">{{ title }}</span>
            </div>
          </div>
        </transition>

        <div class="timer">
          <div class="time-text">الوقت:</div>
          <div class="time">{{ timer.time }}</div>
        </div>

        <div class="slot-content">
          <slot name="content"></slot>
        </div>

        <div class="reset">
          <button class="btn" @click="resetSetting">لعبة جديدة</button>
        </div>

      </dialog>

    </div>
  </transition>
</template>

<script setup lang="ts">
import { useWordleStore } from '@/stores/wordStore.ts';
import CloseIcon from './__icons__/CloseIcon.vue';
import { ref, watch } from 'vue';
import { useTimerStore } from '@/stores/timer.ts';

const props = defineProps<{ isOpen: boolean, showCloseBtn: boolean, title: string }>();
defineEmits(['close']);

const storage = useWordleStore();
const closeBtn = ref<HTMLElement>();
const timer = useTimerStore();

function resetSetting() {
  storage.reset();
  closeBtn.value?.click();
}

watch(() => props.isOpen, (e) => {
  if (!e && storage.index !== 0) timer.start();
  else timer.pause();
})
</script>

<style scoped>
@reference '../assets/main.css';

.model {
  @apply fixed inset-0 z-20 flex items-center justify-center;
}

.shadow {
  @apply h-full w-full fixed inset-0
}

dialog {
  @apply relative flex flex-col max-w-full w-xl h-115 p-5 rounded-lg bg-primary text-read shadow-btn m-0;
}

.close {

  @apply relative transition-all duration-75 cursor-pointer w-fit;

  &:hover svg {
    @apply text-red-300;
  }

  &::before {
    @apply content-[''] scale-0 duration-200 absolute rounded-full w-9 h-9 -top-1.5 -right-1.5 bg-read/20;
  }

  &:hover::before {
    @apply scale-100 starting:scale-0;
  }
}


.box {
  filter: drop-shadow(-1px 0px 7px var(--color-main));
  @apply mx-auto py-4 px-8 bg-main w-fit -rotate-6 rounded-sm;
}

.title {
  @apply h-28;
}

.slot-content {
  @apply flex-1;
}

.text {
  @apply block w-full text-center text-3xl text-secondary font-molhim-bold;
}

.timer {
  @apply flex flex-row flex-nowrap gap-3 pb-2.5 mx-auto;
}

.zoom-leave-to,
.zoom-enter-from {
  @apply scale-90 opacity-0
}

.zoom-leave-active,
.zoom-enter-active {
  @apply transition-all duration-150
}

.drop-enter-from {
  @apply scale-150 opacity-0
}

.drop-leave-active,
.drop-enter-active {
  @apply transition-all duration-300 delay-300
}
</style>
