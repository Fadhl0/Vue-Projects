<template>
  <div class="dropdown">
    <div class="input">
      <div class="tick" v-show="tick">
        <TickIcon />
      </div>
      <input :class="['box', { 'active': isOpen }]" :disabled="disable" :placeholder="placeholder" v-model="searchQuery"
        @focus="isOpen = true" @blur="isOpen = false" ref="inputRef" />
    </div>
    <div v-if="isOpen" class="menu">
      <div class="item" v-for="opt in filter" :key="opt?.id" @mousedown.prevent="submit(opt)">
        {{ opt?.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends { name: string, id: number }">
import { computed, ref } from 'vue'
import TickIcon from './__Icons__/TickIcon.vue';

export interface LocationInputExpose {
  resetInput: () => void;
}

const props = withDefaults(defineProps<{ disable: boolean, placeholder: string, options?: T[] }>(),
  {
    disable: false,
    placeholder: '',
    options: () => []
  }
)

const tick = ref<boolean>(false);

const emit = defineEmits<{
  (e: 'select', value: T | null): void;
}>();

const isOpen = ref(false);
const selected = ref<T | null>(null)
const searchQuery = ref<string>("");

const filter = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return props.options;
  return props.options.filter(e => e.name.toLowerCase().includes(query));
});

const inputRef = ref<HTMLInputElement | null>(null)
const submit = (opt: T) => {
  selected.value = opt;
  emit("select", opt);
  isOpen.value = false;
  searchQuery.value = opt.name ?? "";
  tick.value = true;

  if (inputRef.value) {
    inputRef.value.blur()
  }
}

function resetInput() {
  searchQuery.value = "";
  selected.value = null;
  tick.value = false;
  emit("select", null);
}

defineExpose({ selected, resetInput });

</script>

<style scoped>
@reference "../assets/main.css";

.dropdown {
  @apply w-fit block
}

.box {
  @apply px-2.5 py-1 m-1 text-gray-400 border-gray-400 border-solid border-2 rounded-md block w-56 outline-0 disabled:cursor-not-allowed
}

.active {
  @apply border-gold-400 text-gray-100
}

.menu {
  @apply absolute bg-[#232531] m-1 border-1 border-solid border-gold-400 rounded-md max-h-40 min-h-auto w-56 block overflow-y-auto z-10
}

.item {
  @apply cursor-pointer hover:bg-[#d0b77d20] px-2.5 py-1;
}

.tick {
  @apply text-green-400 absolute h-5.25 w-5.25 translate-x-[-25px] translate-y-2;
}
</style>
