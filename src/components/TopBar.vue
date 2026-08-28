<template>
  <header>
    <LogoComp class="logo" />
    <span>best way to see magic images.</span>
  </header>

  <div>
    <div class="form-container">
      <div class="command-container">

        <Command class="command" @keyup.enter="active = false">
          <CommandInput :auto-focus="false" @click="active = true" :value="input" class="command-input"
            placeholder="Search..." @blur="onBlur" v-model="input" />
        </Command>

        <Command class="bar">
          <CommandList v-show="active">
            <CommandGroup v-if="input !== ''">
              <CommandItem @click="select(input)" :value="input">
                <Search />
                <span>{{ input }}</span>
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading="Recent" v-show="storeHist.retriveHistory.recent.length !== 0">
              <CommandItem @click="select(v)" v-for="(v, i) in storeHist.retriveHistory.recent" :key="i" :value="v">
                <RotateCcwClock />
                <span>{{ v }}</span>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Trending" v-show="storeHist.retriveHistory.trending.length !== 0">
              <CommandItem @click="select(v)" v-for="(v, i) in storeHist.retriveHistory.trending" :key="i" :value="v">
                <TrendingUp />
                <span>{{ v }}</span>
              </CommandItem>
            </CommandGroup>

          </CommandList>
        </Command>

      </div>

      <Button variant="outline" class="btn" @click="onSubmit">
        Search
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { useGIFStore } from '@/stores/Gify';
import { ref } from 'vue';
import LogoComp from './LogoComp.vue';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { RotateCcwClock, TrendingUp, Search } from '@lucide/vue';
import { useHistoryStore } from '@/stores/history.ts';

const storeHist = useHistoryStore();

const storageGif = useGIFStore();
const input = ref("");
function onSubmit() {
  if (input.value === "") return;

  select(input.value);
}

function select(value: string) {
  input.value = value;
  storeHist.add(value)
  storageGif.executeSearch(value);
  active.value = false;
}

function onBlur() {
  setTimeout(() => {
    active.value = false;
  }, 150);
}

const active = ref(false);

</script>

<style scoped>
@reference "@/style.css";

header {
  @apply flex items-end mb-8 gap-2.5 flex-row;
}

.form-container {
  @apply flex flex-wrap items-start gap-2 pb-5;
}

.btn {
  @apply cursor-pointer;
}

.bar,
.command {
  @apply w-80 flex-1 max-w-full z-50;
}

.bar {
  @apply absolute h-fit
}
</style>
