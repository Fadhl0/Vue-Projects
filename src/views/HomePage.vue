<template>
  <div class="home">
    <NavBar @handleSidebar="isActive = !isActive" />
    <div class="grid">
      <SideBar :is-active="isActive" @get-active-id="getActiveSection"
        @handle-create-btn="toggleDialog = true; hideSideBarInMobil()" />
      <TodoContent :get-task-from-home="sendToChild" :active-section="activeSection" />
    </div>
    <div class="dialog">
      <DiaLog @handle-submit="addTodo" :btn-text="'Save'" :disable="textFromCreate.length !== 0" v-model="toggleDialog">
        <template #content>
          <div class="input">
            <AddInput @handleChange="addTodo" v-model="textFromCreate" />
          </div>
        </template>
      </DiaLog>
    </div>
  </div>
</template>

<script lang="ts" setup>

import AddInput from '@/components/AddInput.vue';
import DiaLog from '@/components/DiaLog.vue';
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';
import TodoContent from '@/components/TodoContent.vue';
import { getInitialActiveId, type ActiveIdType } from '@/composable/getInitActiveId';
import { ref, getCurrentInstance } from 'vue';

const isActive = ref<boolean>(false);
const activeSection = ref<ActiveIdType>(getInitialActiveId());
function getActiveSection(payload: ActiveIdType) {
  activeSection.value = payload;
}

const instance = getCurrentInstance();


function hideSideBarInMobil() {
  const main: HTMLElement = instance?.proxy?.$el.parentElement;
  const width: number = main.clientWidth;

  if (width < 600) isActive.value = false;
}

const toggleDialog = ref<boolean>(false);

const textFromCreate = ref<string>("");
const sendToChild = ref<string>("");
function addTodo() {
  if (textFromCreate.value.length === 0) return;
  sendToChild.value = textFromCreate.value;
  textFromCreate.value = "";
}

</script>

<style scoped>
.grid {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}

.input {
  padding: 0 20px;
}
</style>
