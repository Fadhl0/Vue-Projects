<template>
  <main>
    <div class="setting">
      <GearIcon @click="dialog?.changeState(true)" />
    </div>
    <div class="focus">
      <div class="image">
        <img class="aqsa" src="assets/a.png" alt="aqsa-mosque">
      </div>
      <div class="preyer-time">
        <img class="preyer-bg" src="assets/clock.webp" alt="aqsa-mosque">
        <ul class="list">
          <li v-for="(v, i) in prayTime" :key="i" :class="{ 'active': activeStore.getActive === i }">
            <span class="time">
              <span class="letter">{{ v[1] }}</span>
              <span class="number">{{ v[0] }}</span>
            </span>
            <span class="name">{{ i }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="hijri">
      <div class="month">{{ date.fontMonth }}</div>
      <span class="spreater">-</span>
      <div class="day">{{ date.fontDay }}</div>
    </div>
  </main>
  <DiaLog ref="dialog" />
</template>

<script setup lang="ts">
import GearIcon from '@/components/__Icons__/GearIcon.vue';
import { ref } from 'vue';
import DiaLog from '@/components/DiaLog.vue';
import { getHijri } from '@/composable/hijriDate';
import { getPrayTime } from '@/composable/adhanMethod';
import { useActiveStore } from '@/stores/activeAdhan';
import { getActiveAdhan } from '@/composable/getActiveAdhan';

const date = ref(getHijri);
const prayTime = getPrayTime();

const activeStore = useActiveStore();
getActiveAdhan(prayTime as [string, string][]);


type Dialog = {
  changeState: (state: boolean) => void
}
const dialog = ref<Dialog | null>(null)
</script>

<style scoped>
@reference "../assets/main.css";

main {
  @apply h-screen bg-gold-400 bg-[url(../assets/background.webp)] bg-center bg-cover flex flex-wrap justify-center flex-col max-sm:gap-[3vw];
}

.focus {
  @apply flex flex-nowrap justify-center gap-8;
}

.aqsa,
.preyer-bg {
  @apply w-[20vw] max-sm:w-[600px];
}

.preyer-time {
  @apply relative
}

.list {
  @apply absolute top-[3.5vw] left-[2.5vw] max-sm:top-[4.5vw] max-sm:left-[4.5vw] flex flex-col flex-nowrap justify-center content-stretch w-[calc(100%-5.5vw)] h-[calc(100%-7.5vw)] max-sm:w-[calc(100%-10.5vw)] max-sm:h-[calc(100%-8.5vw)];

  li {
    @apply flex flex-row flex-nowrap justify-between text-gold-400 transition-all duration-1000;

    &.active {
      @apply flex-col-reverse content-center flex-wrap items-center;

      .name {
        @apply text-[4.5vw]/[2.5vw] py-3.5 pl-[1vw] max-sm:text-[12.5vw]/[3.5vw] max-sm:pl-[2vw] max-sm:py-5;
      }
    }
  }
}

.name {
  @apply font-pray text-[3vw] h-0 max-sm:text-[7.5vw]/[8.5vw] transition-all duration-200;
}

.time {
  @apply w-fit text-[1.5vw] pt-[0.8vw] max-sm:text-[3.5vw] gap-1 flex flex-row flex-nowrap items-center;
}

.hijri {
  @apply flex flex-row flex-nowrap justify-center items-center text-gold-700 h-[7vw] gap-[1vw] max-sm:gap-[3vw];
}

.month {
  @apply font-hijri text-[5vw]/[5vw] max-sm:text-[14.5vw]/[14.5vw];
}

.day {
  @apply font-ar-number text-[7vw]/[7vw] max-sm:text-[16.5vw]/[16.5vw];
}

.spreater {
  @apply text-[3.5vw] max-sm:text-[8.5vw];
}

.setting {
  @apply absolute top-0 right-0 p-3
}

.setting svg {
  @apply cursor-pointer w-6 h-6 fill-gold-700 hover:fill-gold-700/70 transition-colors duration-100
}
</style>
