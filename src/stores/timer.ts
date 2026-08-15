import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTimerStore = defineStore('timer', () => {
  const elapsedTime = ref(0);
  let timerId: ReturnType<typeof setInterval> | null = null;
  const isTimerRunning = ref(false);

  function start() {
    if (isTimerRunning.value) return;
    isTimerRunning.value = true;
    timerId = setInterval(() => {
      elapsedTime.value++;
    }, 1000);
  }

  function pause() {
    if (timerId) clearInterval(timerId);
    isTimerRunning.value = false;
    timerId = null;
  }

  const time = computed(() => {
    const mins = Math.floor(elapsedTime.value / 60).toString().padStart(2, '0');
    const secs = (elapsedTime.value % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  });

  function reset() {
    pause();
    elapsedTime.value = 0;
  }

  return { time, start, pause, reset }
})
