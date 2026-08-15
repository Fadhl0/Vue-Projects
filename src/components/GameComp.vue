<template>
  <div :class="['main-container']" @click.self="func">
    <div class="game" @click.self="func">
      <BurgerMenu @click="$emit('clickBurger')" />
      <BackgroundStyle />
      <WordComp @click.self="func" />
    </div>
    <KeyboardLayout @click.self="func" />
  </div>
</template>

<script setup lang="ts">
import { useStarsStore } from '@/stores/stars';
import BurgerMenu from './__icons__/BurgerMenu.vue';
import BackgroundStyle from './BackgroundStyle.vue';
import WordComp from './WordComp.vue';
import KeyboardLayout from './KeyboardLayout.vue';

defineEmits(['clickBurger'])

const stars = useStarsStore()

function func(e: PointerEvent) {
  stars.addStar(e.x, e.y);
}

</script>

<style scoped>
@reference '../assets/main.css';

.main-container {
  @apply flex flex-nowrap flex-col h-full relative z-10
}

.game {
  @apply flex-1;
}
</style>
