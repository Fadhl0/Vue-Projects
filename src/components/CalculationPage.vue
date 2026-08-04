<template>
  <InputForm @select="method.setMethod" :disable="false" :placeholder="`Umm Al Qura`"
    :options="method.getMethodList()" />
</template>
<script setup lang="ts">
import { useCalcMethodStore } from '@/stores/CalculationMethod.ts';
import InputForm from './InputForm.vue';

const method = useCalcMethodStore();
</script>
