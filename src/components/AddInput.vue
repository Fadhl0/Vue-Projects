<template>
  <div class="container">
    <div class="inputs">
      <textarea @keydown.enter.prevent="$emit('handleChange')" v-model="model" @change="$emit('handleChange')"
        class="todo-title textarea-lonly" placeholder="Add Task" ref="inputRef"></textarea>
      <div class="details-section" v-if="false">
        <div class="icon" v-show="burgerIcon">
          <i>
            <DetailIcon class="detail-icon" />
          </i>
        </div>
        <textarea class="todo-details" placeholder="Details"></textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DetailIcon from './icons/DetailIcon.vue';

const burgerIcon = ref<boolean>(true);

const inputRef = ref<HTMLInputElement | null>(null);
function focusInput() {
  inputRef.value?.focus()
}
defineExpose({ focusInput });

const model = defineModel<string>();
defineEmits(['handleChange'])
</script>

<style scoped>
.container {
  padding: 0 16px;
}

.inputs {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

textarea {
  background: transparent;
  border: none;
  outline: none;
  color: var(--darkMode-text);
  width: 100%;
  font-family: inherit;
  resize: none;
  line-height: 20px;
  min-height: 20px;
  field-sizing: content;
  overflow-wrap: anywhere;

  &::placeholder {
    color: #afb2b0;
  }
}

.todo-title {
  font-size: 1rem;
}

.textarea-lonly {
  padding: 8px 0;
  border-bottom: 1px outset var(--darkMode-text-2);
  margin-bottom: 12px;
}

.details-section {
  display: flex;
  align-items: flex-start;
  padding: 8px 0;
}

.todo-details {
  padding-left: 10px;
  font-size: .875rem;
}

.icon {
  padding: 2px 0 0 5px;

  i .detail-icon {
    height: 20px;
    width: 20px;
    fill: #afb2b0;
  }
}
</style>
