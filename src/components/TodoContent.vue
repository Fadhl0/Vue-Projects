<template>
  <div class="container">
    <div class="todos">

      <h5 class="title">My Tasks</h5>

      <div class="add-container">
        <!-- toggle input -->
        <div class="add" @click="handleShow()">
          <i>
            <AddIcon class="icon" />
          </i>
          <span class="text">Add a task</span>
        </div>

        <!-- input -->
        <div :class="['addInput', { 'show': showAdd }]" v-show="showAdd" tabindex="-1" @focusout="handleFocusOut">
          <AddInput ref="addInputRef" v-model="inputValue" @handleChange="isBlured = true" />
        </div>
      </div>

      <!-- List -->
      <div class="list">
        <div class="activeTodos" v-for="value in filterd" :key="value.uuid">
          <div class="text">
            <TickButton :is-checked="value.isComplete" :id="`todo-${value.uuid}`"
              @handleClick="updateStatus(value.uuid)" />
            <div class="todo-item">
              <label contenteditable="true" :class="['todo-text', { 'completed': value.isComplete }]" @blur="updateText"
                :data-id="value.uuid">{{
                  value.text
                }}</label>
            </div>
          </div>
          <div class="trash-can" @click="deleteList(value.uuid)">
            <TrashCan />
          </div>
        </div>
        <div class="empty-msg" v-if="filterd.length === 0 && !showAdd" :class="{ 'display': !showAdd }">
          No TODOs
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import AddInput from './AddInput.vue';
import AddIcon from './icons/AddIcon.vue';
import TickButton from '@/components/TickButton.vue';
import type { Todo } from '@/composable/TodoInterface.ts';
import TrashCan from './icons/TrashCan.vue';

const showAdd = ref<boolean>(false);
function handleFocusOut(e: FocusEvent) {
  const container = e.currentTarget as HTMLElement | null;
  const newTarget = e.relatedTarget as Node | null;

  if (container && !container.contains(newTarget)) {
    showAdd.value = false;
  }
}

// focus input (Title)
const addInputRef = ref<HTMLInputElement | null>(null);
async function handleShow() {
  if (showAdd.value === true) return;

  showAdd.value = true;
  await nextTick();

  // @ts-expect-error This method exist in 'AddInput' sent via 'expose' feature.
  addInputRef.value?.focusInput();
}

// load data
const STORAGE_KEY = 'my_vue_todos';
const data = reactive<Todo[]>([]);
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      data.push(...parsed);
    } catch (e) {
      console.error('Failed to parse saved todos:', e);
    }
  }
});
watch(data, (value: Todo[]) => localStorage.setItem(STORAGE_KEY, JSON.stringify(value)));

// filters
const props = defineProps<{ activeSection: number, getTaskFromHome: string }>();
const filterd = computed<Todo[]>(() => {
  if (props.activeSection === 1) return data.filter(todo => !todo.isComplete);

  if (props.activeSection === 2) return data.filter(todo => todo.isComplete);

  return data;
});

// Update & delete
function updateStatus(id: string) {
  const target = data.find(e => e.uuid === id);
  if (target) target.isComplete = !target.isComplete;
}

function deleteList(id: string) {
  const target = data.findIndex(e => e.uuid === id);
  if (target !== -1) data.splice(target, 1);
}

const updateText = (event: FocusEvent) => {
  const el = event.target as HTMLLabelElement;
  const text: string | null = el.textContent;
  const uuid = el.dataset.id as string;
  const target = data.find(e => e.uuid === uuid);
  if (target) target.text = text;
}

//submit input
const inputValue = ref();
const isBlured = ref(false);
watch(isBlured, () => {
  if (!isBlured.value) return;

  data.unshift({ text: inputValue.value, uuid: crypto.randomUUID(), isComplete: false })
  isBlured.value = false
  inputValue.value = "";
});


// add tasks from create button
watch(() => props.getTaskFromHome, (task) => {
  data.unshift({ text: task, uuid: crypto.randomUUID(), isComplete: false })

  task = "";
})
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  place-content: flex-start center;
  padding: 0 4px 0 12px;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
}

.todos {
  background-color: var(--darkMode-bg-2);
  border-radius: 16px;
  flex-shrink: 1;
  flex-grow: 1;
  margin: 0 4px 4px;
  max-width: 680px;
  min-width: 300px;
  overflow: clip;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  width: 100%;
  position: relative;
  box-shadow: var(--box-shadow);
  font-size: .875rem;

  overflow-y: auto;
  overflow-x: hidden;
  min-height: stretch;
  max-height: calc(100vh - 80px);
}

.title {
  user-select: none;
  font-size: 1.125rem;
  line-height: 1.5rem;
  letter-spacing: 0;
  text-align: left;
  font-weight: 400;

  padding: 16px 0 5px 16px;
  position: sticky;
  top: 0;
  background-color: inherit;
  z-index: 1;
  color: var(--darkMode-text);
}

.add-container {
  position: sticky;
  top: 45px;
  left: 0;
  background: var(--darkMode-bg-2);
  z-index: 1;
}

.add {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  margin: 5px 8px;
  padding: 4px 8px;
  overflow: clip;
  color: var(--color-active);
  cursor: pointer;
  background-color: transparent;
  transition: 0.1s;
  gap: 12px;
  font-weight: 500;

  .icon {
    width: 20px;
    height: 20px;
    fill: var(--color-active);
  }

  &:hover {
    background-color: var(--bg-active);
    border-radius: 0.875rem;
  }

  span.text {
    margin-top: 4px;
    user-select: none;
  }
}

.addInput {
  display: flex;
  align-items: flex-start;
  padding: 0 16px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  transition: 0.25s ease allow-discrete;
  transform: translateX(-100%);

  &.show {
    transform: translateX(0);

    @starting-style {
      transform: translateX(-100%);
    }

  }
}

.list {
  display: flex;
  flex-direction: column;

  gap: 12px;
  padding: 6px 0 25px;
}

.activeTodos {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  gap: 12px;
  padding: 0 17px;
  width: calc(100% - (17*2px));
  justify-content: space-between;

  .text {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    gap: 12px;
  }
}

.todo-item {
  display: flex;
  align-items: flex-start;
  min-width: 0;
}

.todo-text {
  padding-top: 3px;
  overflow-wrap: anywhere;

  display: inline-block;
  height: fit-content;

  &:focus {
    text-decoration: none;
    color: var(--darkMode-text);
  }
}

.completed {
  color: var(--darkMode-text-disable);
  text-decoration: line-through;
}

.trash-can {
  color: var(--darkMode-text-disable);
  transition: 0.2s;
  cursor: pointer;
  position: relative;

  &:hover {
    color: var(--darkMode-text)
  }

  &::before {
    content: "";
    width: 30px;
    height: 30px;
    background-color: var(--darkMode-text);
    opacity: 0.1;
    position: absolute;
    top: -7px;
    left: -7px;
    border-radius: 50%;
    display: none;
    transform: scale(0);
    transition: 0.2s allow-discrete;
  }

  &:hover::before {
    transform: scale(1);
    display: block;

    @starting-style {
      transform: scale(0);
    }
  }
}

.empty-msg {
  text-align: center;
  width: 100%;
  color: var(--darkMode-text-disable);
  user-select: none;

  &.display {
    transition: 0.4s allow-discrete;
    transform: translateY(0);
    opacity: 1;

    @starting-style {
      transform: translateY(-10px);
      opacity: 0;
    }
  }
}
</style>
