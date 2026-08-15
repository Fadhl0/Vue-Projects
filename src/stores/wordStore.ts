import { computed, onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { useStatusStore } from './useStatus';
import { useTimerStore } from './timer';

type WORD = {
  word: string,
  effort: number
}

async function wordleList(): Promise<WORD> {
  const ar = await fetch('/words.json');
  if (!ar.ok) {
    throw new Error(`JSON error! Status: ${ar.status}`);
  }

  const data = await ar.json();

  const index = Math.floor(Math.random() * data.length);

  return data[index] as WORD;
}

const createEmptyBoard = () => [[], [], [], [], []];

export const useWordleStore = defineStore('word', () => {
  const word = ref<string[][]>(createEmptyBoard());

  const attempt = ref(4);

  const isWinner = ref(false);
  const gameOver = ref(false)

  const currentWord = ref<WORD>();
  const userInput = ref<string[]>([]);

  const status = useStatusStore();
  const timer = useTimerStore();

  onMounted(async () => {
    currentWord.value = await wordleList();
  })

  const index = computed<number>(() => 4 - attempt.value);

  function add(letter: string) {
    if (letter === 'حذف') {
      backSpace();
      return;
    }
    if (letter === 'ادخال') {
      enter();
      return;
    }

    const curr = word.value[index.value];
    if (letter.length === 1 && curr && curr.length < 5) {
      curr.push(letter);
    }
  }

  function backSpace() {
    if (gameOver.value) return;

    const curr = word.value[index.value]
    if (curr && curr.length > 0) {
      curr.pop();
    }
  }

  function enter() {
    if (gameOver.value) return;


    const curr = word.value[index.value]
    if (curr && curr.length === 5) {
      timer.start();

      userInput.value = curr;

      const target = currentWord.value?.word;

      if (target) status.submitGuess(userInput.value, target.split(""));

      if (userInput.value.join("") === target) {
        gameOver.value = true;
        isWinner.value = true;
      }

      attempt.value--;

      if (attempt.value < 0) {
        gameOver.value = true;
      }
    }
  }

  async function reset() {
    const next = await wordleList();
    word.value = createEmptyBoard();
    attempt.value = 4;
    userInput.value = [];
    currentWord.value = next;
    gameOver.value = false;
    isWinner.value = false;
    timer.reset();
    status.resetStatus();
  }

  return { word, currentWord, userInput, index, gameOver, isWinner, add, backSpace, reset, enter }
});
