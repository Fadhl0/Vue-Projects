<template>
  <div class="win">
    <pre class="to-copy" ref="copy">{{ getStatus }}</pre>
    <button class="btn" @click="copyResult">
      <div class="icon">
        <CopyIcon v-show="!copied" />
        <TickIcon v-show="copied" />
      </div>
      <span class="copy">{{ text }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CopyIcon from './__icons__/CopyIcon.vue';
import TickIcon from './__icons__/TickIcon.vue';
import { storeToRefs } from 'pinia';
import { useStatusStore } from '@/stores/useStatus.ts';

const copy = ref<HTMLElement>();
const text = ref("نسخ");
const storage = useStatusStore();
const { getStatus } = storeToRefs(storage);

const copied = ref(false);
const timeout = ref<ReturnType<typeof setTimeout> | null>()
function copyResult() {
  if (timeout.value) clearTimeout(timeout.value);

  navigator.clipboard.writeText(copy.value?.innerText ?? '');
  copied.value = true;
  text.value = "تم النسخ";

  timeout.value = setTimeout(() => {
    copied.value = false;
    text.value = "نسخ";
  }, 3000)
}
</script>

<style scoped>
@reference '../assets/main.css';

.win {
  @apply w-fit mx-auto text-read
}

.to-copy {
  @apply whitespace-pre-wrap text-xl mb-2 py-2.5 px-1.5 bg-secondary rounded-lg
}

.btn {
  @apply mb-5 text-sm flex items-center gap-1.5
}
</style>
