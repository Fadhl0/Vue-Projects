<template>
  <div class="pagination">
    <Pagination :items-per-page="limit" :total="total" :page="currPage + 1" @update:page="handlePageUpdate">

      <PaginationContent v-slot="{ items }">
        <PaginationPrevious />

        <template v-for="(item, i) in items" :key="i">
          <!-- Page Numbers -->
          <PaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === currPage + 1">
            {{ item.value }}
          </PaginationItem>

          <PaginationEllipsis v-else-if="item.type === 'ellipsis'" :index="i" />
        </template>

        <PaginationNext />
      </PaginationContent>
    </Pagination>
  </div>
</template>

<script lang="ts" setup>
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useGIFStore } from '@/stores/Gify';
import { storeToRefs } from 'pinia';

const store = useGIFStore();
const { limit, total, currPage } = storeToRefs(store);

const handlePageUpdate = (newPage: number) => {
  const page = newPage - 1
  if (page !== store.currPage) {
    store.goToPage(page);
  }
}
</script>

<style scoped>
@reference "@/style.css";

.pagination {
  @apply flex flex-col gap-6;
}
</style>
