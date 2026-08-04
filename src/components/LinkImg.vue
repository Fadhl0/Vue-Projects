<template>
  <a :href="link" target="_blank">
    <span class="title">{{ name }}</span>
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
defineProps<{ name: string, link: string }>();
</script>

<style scoped>
@reference "../assets/main.css";

a {
  @apply flex flex-row items-center gap-1
}
</style>
