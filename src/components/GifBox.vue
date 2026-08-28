<template>
  <main class="gifs">
    <div class="giphy-flex-grid">
      <div v-for="(col, i) in gifs.gifColumns" :key="i" class="giphy-column">
        <div v-for="gif in col" :key="gif.id" class="giphy-card">
          <div class="img-container">
            <img loading="lazy" :src="gif.images.original.webp" :alt="gif.title" @load="loadedImages[gif.id] = true"
              class="img" />
            <div class="img-content">
              <div class="content-head">
                <ToolTip tip="View">
                  <div class="icon" @click="viewDialog(gif)">
                    <Eye />
                  </div>
                </ToolTip>
                <ToolTip tip="Download">
                  <div class="icon mobile" @click="downloadGif(gif.images.original.url, gif.title)">
                    <ArrowDownToLine />
                  </div>
                </ToolTip>
                <ToolTip tip="Copy">
                  <div class="icon mobile" @click="copy(gif.images.original.url)">
                    <Link2 />
                  </div>
                </ToolTip>
              </div>
            </div>
          </div>
          <Skeleton class="skeleton" :style="`height: ${Math.min(gif.images.fixed_height.height, 250)}px`"
            v-if="!loadedImages[gif.id]" />
        </div>
      </div>
    </div>
  </main>

  <PaginationComp />

  <DialogView v-model:open="open" :curr="curr" />
</template>

<script setup lang="ts">
import PaginationComp from '@/components/PaginationComp.vue';
import { useGIFStore } from '@/stores/Gify';
import { ref } from 'vue';
import Skeleton from './ui/skeleton/Skeleton.vue';
import { ArrowDownToLine, Eye, Link2 } from '@lucide/vue';
import ToolTip from './ToolTip.vue';
import type { IGif } from '@giphy/js-types';
import DialogView from './DialogView.vue';
import { copy, downloadGif } from '@/composable/common.ts';

const loadedImages = ref<Record<string, boolean>>({});
const gifs = useGIFStore();

const open = ref(false)
const curr = ref<IGif | null>(null)
function viewDialog(obj: IGif) {
  curr.value = obj;
  open.value = true;
}
</script>

<style scoped>
@reference "@/style.css";

.gifs {
  @apply flex-1
}

.giphy-flex-grid {
  @apply flex gap-4 mx-auto;
}

.giphy-column {
  @apply flex-1 flex flex-col gap-4;
}

.skeleton,
.giphy-card img {
  @apply w-56 max-sm:w-full h-auto rounded-xl;
}

.content,
.links {
  @apply w-fit;
}

.img-container {
  @apply relative;
}

.img-content {
  box-shadow: inset rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;

  @apply absolute top-0 left-0 w-full h-full hidden transition duration-100;
}

.img-container:hover .img-content {
  @apply block;
}

.content-head {
  @apply h-8 w-full flex flex-row flex-nowrap justify-end items-center gap-2.5 px-2.5 mt-2;
}

.icon {
  @apply cursor-pointer bg-white/50 text-black w-9 h-9 rounded-xl flex items-center justify-center;
}

svg {
  @apply outline-0;
}

.mobile {
  @apply max-sm:hidden;
}
</style>
