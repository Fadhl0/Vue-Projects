<script setup lang="ts">
import DiaLog from '@/components/DiaLog.vue';
import GameComp from '@/components/GameComp.vue';
import LoseComp from '@/components/LoseComp.vue';
import StarsLetters from '@/components/StarsLetters.vue';
import WinComp from '@/components/WinComp.vue';
import { getRandomInt } from '@/composables/getRandomint';
import { useWordleStore } from '@/stores/wordStore';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const isOpen = ref(false);
const motivation = [
  "النجاح يبدأ بقرار.",
  "لا تنتظر الفرصة، بل اصنعها بنفسك.",
  "كل خطوة صغيرة تقربك من هدفك الكبير.",
  "شغفك هو المحرك، واستمرارك هو السر.",
  "طالما أنك تحاول، فأنت لم تفشل بعد.",
  "الصعوبات اليوم هي قوة الغد.",
  "طالما أنك تحاول، فأنت لم تفشل بعد.",
  "لا تقارن نفسك بغيرك، قارن نفسك بما كنت عليه أمس.",
  "الأحلام العظيمة تتطلب جهداً عظيماً.",
  "أفضل وقت للبدء كان الأمس، والوقت الثاني الأفضل هو الآن.",
];

const storage = useWordleStore()
const { gameOver, isWinner } = storeToRefs(storage);

const content = ref<{ title: string; status: 0 | 1 | -1 }>({
  title: 'تم الايقاف مؤقتاً',
  status: 0,
});

watch([gameOver, isWinner], async ([isOver, winner]) => {
  const status = isOver && winner ? 1 : isOver && !winner ? -1 : 0;

  const title =
    status === 1
      ? 'لقد فزت يا صديقي'
      : status === -1
        ? 'لقد خسرت يا صاحبي'
        : "تم الايقاف مؤقتاً";

  if (status !== 0) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  content.value = { title, status };
}, { immediate: true }
);
</script>

<template>

  <main :class="{ 'blur-xs': (isOpen || content.status !== 0) }">
    <StarsLetters />
    <GameComp @clickBurger="isOpen = true" />
  </main>

  <teleport to='body'>
    <DiaLog :title="content.title" :is-open="isOpen || content.status !== 0" @close="isOpen = false"
      :show-close-btn="content.status === 0">
      <template #content>
        <span v-show="content.status === 0" class="motivation">{{ motivation[getRandomInt(0, 9).value] }}</span>
        <WinComp v-show="content.status === 1" />
        <LoseComp v-show="content.status === -1" />
      </template>
    </DiaLog>
  </teleport>

</template>

<style scoped>
@reference '../assets/main.css';

main {
  @apply relative w-full h-screen overflow-hidden
}

.motivation {
  @apply text-center block font-molhim text-3xl pt-10;
}
</style>
