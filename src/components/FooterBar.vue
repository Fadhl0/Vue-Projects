<template>
  <footer>

    <div class="sitemap">
      <LogoComp class="logo" />

      <div>
        <h3 class="title">Explore Trending</h3>
        <ul class="list">
          <li v-for="(v, i) in trendingList" :key="i">
            <a @click="submit(v)" class="link">{{ v }}</a>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="title">Links</h3>
        <ul class="space-y-2 text-sm">
          <li v-for="link in links" :key="link.id">
            <a :href="link.link" target="_blank" class="link">{{ link.name }}</a>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="title">Other Projects</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="https://github.com/Fadhl0/Vue-Projects/tree/vue-todo" target="_blank" class="link">To-do</a></li>
          <li><a href="https://github.com/Fadhl0/Vue-Projects/tree/Daily-Salah" target="_blank" class="link">Daily Salah
              Wallpaper</a></li>
          <li><a href="https://github.com/Fadhl0/Vue-Projects/tree/wordle-ar" target="_blank" class="link">Wordle In
              Arabic</a>
          </li>
          <li><a href="https://github.com/Fadhl0?tab=repositories" target="_blank" class="link">more...</a></li>
        </ul>
      </div>

    </div>

    <div class="end-footer">
      <p>&copy; {{ new Date().getFullYear() }} Rose Gify, Inc. All rights reserved.</p>

      <div class="link-logo">
        <a v-for="link in links" :key="link.id" :href="link.link" target="_blank" class="link">
          <component :is="link.logo" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { trendingList } from '@/stores/history.ts';
import LogoComp from './LogoComp.vue';
import { useGIFStore } from '@/stores/Gify.ts';
import GitHub from './__icons__/GitHub.vue';
import HuggingFace from './__icons__/HuggingFace.vue';
import LinkedIn from './__icons__/LinkedIn.vue';

function submit(value: string) {
  useGIFStore().executeSearch(value);
}

const links = [
  { name: 'GitHub', link: 'https://github.com/Fadhl0', id: 1, logo: GitHub },
  { name: 'LinkedIn', link: 'https://www.linkedin.com/in/fadhl-alfadhili/', id: 3, logo: LinkedIn },
  { name: 'HuggingFace', link: 'https://huggingface.co/Fadhl0', id: 2, logo: HuggingFace },
]

</script>

<style scoped>
@reference "@/style.css";

footer {
  @apply bg-black pt-12 pb-8 px-6 border-t border-gray-800 w-full;
}

.sitemap {
  @apply max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12;
}

.title {
  @apply text-sm font-semibold text-white tracking-wider uppercase mb-4;
}

.list {
  @apply space-y-2 text-sm capitalize;
}

.link {
  @apply hover:text-rose-400 transition cursor-pointer
}

.logo {
  @apply mb-6
}

.link-logo {
  @apply flex space-x-6 text-gray-400;
}

.end-footer {
  @apply max-w-7xl mx-auto pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4;
}
</style>
