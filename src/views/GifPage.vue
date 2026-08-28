<template>
  <Toaster theme="dark" position="top-right" />
  <main class="main-container">
    <TopBar />
    <GifBox v-if="!isEmpty" />
    <NotFound v-else class="h-full!" />
  </main>
  <FooterBar />
</template>

<script lang="ts" setup>
import 'vue-sonner/style.css'
import TopBar from '@/components/TopBar.vue';
import FooterBar from '@/components/FooterBar.vue';
import GifBox from '@/components/GifBox.vue';
import { useGIFStore } from '@/stores/Gify';
import NotFound from './NotFound.vue';
import { storeToRefs } from 'pinia';
import { Toaster } from 'vue-sonner';

const store = useGIFStore();
const { isEmpty } = storeToRefs(store);
</script>

<style scoped>
@reference "@/style.css";

.main-container {
  @apply flex flex-nowrap p-2.5 min-h-screen max-h-full items-center flex-col;
}
</style>
