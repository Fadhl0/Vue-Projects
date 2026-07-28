<template>
  <nav class="navbar">
    <div class="container">
      <div class="burger-tab">
        <div class="burger-icon" @click="$emit('handleSidebar')">
          <BurgerIcon />
        </div>
        <i class="logo">📆</i>
        <h3 class="name logo">Calendar</h3>
      </div>
      <div class="profile">
        <div class="tick-icon">
          <TickIcon />
        </div>
        <button class="btn-subscription">Upgrade</button>
        <div class="app-icon">
          <AppIcon />
        </div>
        <div class="pp">
          <span v-text="`F`"></span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import BurgerIcon from '@/components/icons/BurgerIcon.vue';
import TickIcon from '@/components/icons/TickIcon.vue';
import AppIcon from '@/components/icons/AppIcon.vue';
defineEmits(['handleSidebar']);
</script>

<style scoped>
.navbar {
  height: 48px;
  max-width: 100%;
  padding: 8px;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  overflow: clip;
}

.burger-tab {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  align-content: start;
  gap: 5px;

  .name,
  i {
    user-select: none;
  }
}

.burger-icon,
.tick-icon,
.app-icon {
  padding: 16px;
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    width: 48px;
    height: 48px;
    background-color: var(--darkMode-text);
    opacity: 0.1;
    position: absolute;
    top: 4px;
    left: 4px;
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

h3 {
  font-family: inherit;
}

.logo {
  font-size: 1.75rem;
}

.tick-icon svg {
  width: 24px;
  height: 24px;
  fill: var(--darkMode-text);
}

.tick-icon::before {
  background-color: var(--bg-active-hover);
  opacity: 0.3;
}

.btn-subscription {
  background: var(--bg-active-2);
  border: none;
  color: var(--color-active);
  font-size: 0.875rem;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 1.5rem;
  cursor: pointer;
  transition: 0.2s;
  user-select: none;

  &:hover {
    background: var(--bg-active-hover);
  }
}

.profile {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-direction: row;
  margin-right: 10px;
}

.pp {
  width: 32px;
  height: 32px;
  background: var(--profile-color);
  border-radius: 50%;
  position: relative;
  cursor: pointer;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
  }
}

@media (width < 500px) {
  .btn-subscription {
    display: none;
  }

  .tick-icon {
    display: none;
  }
}
</style>
