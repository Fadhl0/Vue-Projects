import { defineStore } from "pinia";
import { allLetters } from "../composables/connecter";
import { computed, ref } from "vue";
import { getRandomInt } from "@/composables/getRandomint";

type position = {
  x: number,
  y: number
}

export type STAR = {
  position: position,
  letter: string,
}

export const useStarsStore = defineStore('stars', () => {
  const all = ref<STAR[]>([]);
  const positions = ref<position[]>([]);

  const getAllStars = computed(() => all.value);

  function addStar(offsetX: number, offsetY: number) {
    const x: number = (offsetX / window.innerWidth) * 100;
    const y: number = (offsetY / window.innerHeight) * 100;

    const exists = positions.value.some(pos => pos.x === x && pos.y === y);
    if (exists) return;

    positions.value.push({ x, y });

    const newData = {
      position: { x, y },
      letter: getRandomElement()
    };

    all.value.push(newData);
  }

  return { getAllStars, addStar };

});

const len = allLetters.size - 1

function getRandomElement(): string {
  const randomIndex = getRandomInt(0, len).value
  let curr = 0;

  for (const item of allLetters) {
    if (curr === randomIndex) return item;

    curr++;
  }

  return 'ب'
}
