<template>
  <div @click="main" class="logo">
    <Rose :size="45" :stroke-width="1.5" class="icon" />
    <span>gify</span>
  </div>
</template>

<script lang="ts" setup>
import { DEFUALT_SEARCH, useGIFStore } from '@/stores/Gify';
import { Rose } from '@lucide/vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const storage = useGIFStore();
function main() {
  router.push({ name: 'home' })
  storage.executeSearch(DEFUALT_SEARCH)
}
</script>

<style scoped>
@reference "@/style.css";

.logo {
  @apply flex text-4xl flex-nowrap flex-row text-[#fc2d79] cursor-pointer w-fit;
}

.icon {
  @apply -scale-x-100 translate-y-[18.7px] rotate-315;
}
</style>
