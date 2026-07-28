<template>
  <div class="container" v-if="show">
    <div class="shadow" @click="show = false"></div>
    <div class="dialog">
      <dialog class="window">
        <div class="close">
          <i class="icon" @click="show = false">
            <CloseIcon />
          </i>
        </div>

        <!-- Content -->
        <slot name="content"></slot>

        <div class="save-btn">
          <button @click="$emit('handleSubmit')" :class="{ 'active': disable }">{{ btnText }}</button>
        </div>
      </dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CloseIcon from '@/components/icons/CloseIcon.vue';

defineProps<{ btnText: string, disable: boolean }>();
defineEmits(['handleSubmit']);

const show = defineModel<boolean>();
show.value = false;

</script>

<style scoped>
.shadow,
.dialog {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: var(--darkMode-bg-shadow);
}

.shadow {
  z-index: 998;
}

.window {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: scale(1) translate(-50%, -50%);
  margin: 0;
  padding: 0;
  border: none;
  box-shadow: var(--box-shadow);

  height: fit-content;
  /* width: auto; */
  min-width: 650px;
  min-height: 100px;
  background: var(--darkMode-bg-2);
  border-radius: 1.175rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  z-index: 999;

  transition: 0.2s transform allow-discrete;


  @starting-style {
    display: block;
    transform: scale(0.95) translate(-52%, -53%);
  }
}

.close {
  padding: 20px 20px 0;
  display: flex;
  justify-content: flex-end;

  color: var(--darkMode-text);
}

.icon {
  cursor: pointer;
  transition: 0.1s;
  position: relative;

  &::before {
    content: "";
    width: 35px;
    height: 35px;
    background-color: var(--darkMode-text);
    opacity: 0.1;
    position: absolute;
    top: -5px;
    right: -5px;
    border-radius: 50%;
    display: none;
    transform: scale(0);
    transition: 0.2s allow-discrete;
    /* z-index: -1; */
  }

  &:hover::before {
    transform: scale(1);
    display: block;

    @starting-style {
      transform: scale(0);
    }
  }
}

.save-btn {
  display: flex;
  flex-direction: row-reverse;
  padding: 0 20px 20px 20px;

  button {
    background-color: var(--bg-active);
    border-radius: 1.125rem;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    color: var(--darkMode-text-disable);
    font-weight: 600;
    text-transform: capitalize;
    user-select: none;
    cursor: default;
  }

  .active {
    color: var(--bg-active-2);
    cursor: pointer;
    background-color: var(--color-active);

    &:hover {
      background-color: var(--color-active-hover);
    }
  }
}

@media (width < 650px) {
  .window {
    width: 100%;
    min-width: fit-content;
  }
}
</style>
