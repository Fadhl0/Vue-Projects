<template>
  <div class="content">
    <div class="setting">
      <div class="sub-setting" v-show="activeTab === 0">
        <div class="input">
          <h3>يجب عليك اختيار محل سكنك <span class="imp">*</span></h3>
          <InputContainer />
        </div>
        <div class="route-path">
          {{ routePath.getLocationName }}
          <span class="title">:الموقع الحالي</span>
        </div>
      </div>
      <div class="sub-setting" v-show="activeTab === 1">
        <div class="input">
          <h3>اختر طريقة حساب الاذان</h3>
          <CalculationPage />
        </div>
        <div class="route-path">
          {{ method.getMethodName }}
          <span class="title">:طريقة الحساب الحالية</span>
        </div>
      </div>
      <div class="sub-setting" v-show="activeTab === 2">
        <div class="input">
          <h3>يمكنك تعديل التقويم الهجري</h3>
          <AdjestHijri />
        </div>
      </div>
      <div class="sub-setting" v-show="activeTab === 3">
        <AboutMe />
      </div>
    </div>
    <div class="tabs">
      <div @click="activeTab = 0" :class="['adhan', { 'active': activeTab === 0 }]">الاذان</div>
      <div @click="activeTab = 1" :class="['calcu', { 'active': activeTab === 1 }]">طريقة الحساب</div>
      <div @click="activeTab = 2" :class="['hijri', { 'active': activeTab === 2 }]">التقويم الهجري</div>
      <div @click="activeTab = 3" :class="['about', { 'active': activeTab === 3 }]">حول</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import InputContainer from './InputContainer.vue';
import { useLocationStore } from '@/stores/loaction.ts';
import CalculationPage from './CalculationPage.vue';
import { useCalcMethodStore } from '@/stores/CalculationMethod.ts';
import AdjestHijri from './AdjestHijri.vue';
import AboutMe from './AboutMe.vue';

const activeTab = ref(0);

const routePath = useLocationStore();
const method = useCalcMethodStore();

</script>

<style scoped>
@reference "../assets/main.css";

.content {
  @apply grid grid-cols-7 text-gold-400 max-sm:h-full h-11/12;
}

h3 {
  @apply text-gray-100
}

.tabs {
  @apply col-span-2 shadow-[-10px_0_15px_-5px] shadow-gold-700/10
}

.adhan, .hijri, .calcu, .about {
  @apply cursor-pointer text-end p-3.5 hover:bg-[#d0b77d20] transition-all duration-100
}

.setting {
  @apply col-span-5 pr-12 pt-5
}

.active {
  @apply bg-gold-700 hover:bg-gold-700;
}

.sub-setting {
  @apply flex flex-nowrap flex-col pb-4 h-full justify-between
}

.input {
  @apply flex flex-col items-end gap-4
}

.route-path {
  @apply text-end w-full ps-7
}

.title {
  @apply text-gray-400
}

.calc-method {
  @apply flex flex-col items-end gap-4
}

span.imp {
  @apply text-red-400
}
</style>
