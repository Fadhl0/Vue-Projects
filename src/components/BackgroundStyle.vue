<template>
  <transition appear name="slide">
    <div class="background-style">
      <img class="cord" src="@/assets/threads.webp" alt="cord image">
      <img class="lantern lantern-glow" src="@/assets/1.webp" alt="lantern 1">
      <img class="lantern" src="@/assets/2.webp" alt="lantern 2">
    </div>
  </transition>
</template>


<style scoped>
@reference '../assets/main.css';

.background-style {
  @apply absolute top-0 left-0 overflow-hidden;
}

img {
  @apply h-96 top-0 left-2.5 max-sm:hidden
}

.cord {
  @apply relative z-10
}

.lantern {
  @apply absolute animate-shake origin-top
}

.lantern-glow {
  filter: drop-shadow(0 0 30px var(--color-main))
}

.slide-enter-active {
  @apply animate-drop transition-all duration-300 delay-75
}
</style>
