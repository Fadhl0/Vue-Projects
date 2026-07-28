<template>
  <div :class="['sidebar', { 'toggle': isActive }]">
    <button class="add-todos" @click="$emit('handleCreateBtn')">
      <PlusIcon class="plus-icon" />
      <span>Create</span>
    </button>
    <div class="sections">
      <div class="section" v-for="(v, i) in sections" :key="i" @click="changeActive(i); $emit('getActiveId', i)"
        :class="{ 'active': activeId === i }">
        <CalandarIcon v-if="i === 0" />
        <ActiveCalendar v-else-if="i === 1" />
        <TickIcon v-else />
        <span v-text="v"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getInitialActiveId, key, type ActiveIdType } from '@/composable/getInitActiveId.ts';
import ActiveCalendar from './icons/ActiveCalendar.vue';
import CalandarIcon from './icons/CalandarIcon.vue';
import PlusIcon from './icons/PlusIcon.vue';
import TickIcon from './icons/TickIcon.vue';
import { ref } from 'vue';

defineProps<{ isActive: boolean }>();

const sections = ["All Tasks", "Active Tasks", "Completed"];
const activeId = ref<ActiveIdType>(getInitialActiveId());
const changeActive = (id: number) => {
  activeId.value = id as ActiveIdType;
  localStorage.setItem(key, `section_${id}`);
};

defineEmits(['getActiveId', 'handleCreateBtn']);

</script>

<style scoped>
.sidebar {
  user-select: none;
  background-color: var(--darkMode-bg);
  height: stretch;
  z-index: 99;

  transition: 0.2s allow-discrete;
  transform: translateX(-100%);
  display: none;
}

.toggle {
  transform: translateX(0) !important;
  display: block !important;

  @starting-style {
    transform: translateX(-100%);
    display: none;
  }
}

.add-todos {
  display: flex;
  /* align-content: center; */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #37393b;
  color: var(--darkMode-text);
  outline: none;
  border: none;
  cursor: pointer;
  padding: 10px 2rem 10px 1rem;
  border-radius: 1rem;
  transition: 0.2s background;
  margin: 10px 0 30px 20px;
  gap: 7px;

  span {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: var(--darkMode-text-2);
  }

  &:hover {
    background: #40454a;
  }
}

.plus-icon {
  width: 35px;
  height: 35px;
}

.active {
  background: #004a77;
}

.section {
  font-weight: 400;
  padding: 7px 25px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  gap: 10px;
  border-radius: 1rem;
  font-size: .875rem;
  cursor: pointer;
  width: 175px;
  margin: 0 10px;
  height: 20px;
  transition: 0.2s;

  &:not(.active):hover {
    background: #292929;
  }
}

@media (width < 600px) {
  .sidebar {
    position: absolute;
    left: 0;
    width: stretch;
  }

  .section {
    width: stretch;
  }
}
</style>
