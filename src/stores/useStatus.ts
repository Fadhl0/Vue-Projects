import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useWordleStore } from "./wordStore";

/*
-1 is defualt color
0 is yallow
1 is green
*/

type STATUS = -2 | -1 | 0 | 1;
type KEY = { id: number, letter: string, color: string }

const default_color = 'bg-primary';
const correct = 'bg-success';
const half = 'bg-warning';
const disabled = 'bg-disable';
const createEmptyGrid = (): string[][] =>
  Array.from({ length: 5 }, () => Array(5).fill(default_color));


const initKeyboard: KEY[][] = [[
  { id: 1, letter: 'د', color: default_color },
  { id: 2, letter: 'ج', color: default_color },
  { id: 3, letter: 'ح', color: default_color },
  { id: 4, letter: 'خ', color: default_color },
  { id: 5, letter: 'ه', color: default_color },
  { id: 6, letter: 'ع', color: default_color },
  { id: 7, letter: 'غ', color: default_color },
  { id: 8, letter: 'ف', color: default_color },
  { id: 9, letter: 'ق', color: default_color },
  { id: 10, letter: 'ث', color: default_color },
  { id: 11, letter: 'ص', color: default_color },
  { id: 12, letter: 'ض', color: default_color },
], [
  { id: 13, letter: 'حذف', color: default_color },
  { id: 14, letter: 'ط', color: default_color },
  { id: 15, letter: 'ك', color: default_color },
  { id: 16, letter: 'م', color: default_color },
  { id: 17, letter: 'ن', color: default_color },
  { id: 18, letter: 'ت', color: default_color },
  { id: 19, letter: 'ا', color: default_color },
  { id: 20, letter: 'ل', color: default_color },
  { id: 21, letter: 'ب', color: default_color },
  { id: 22, letter: 'ي', color: default_color },
  { id: 23, letter: 'س', color: default_color },
  { id: 24, letter: 'ش', color: default_color },
], [
  { id: 25, letter: 'ادخال', color: default_color },
  { id: 26, letter: 'ظ', color: default_color },
  { id: 27, letter: 'ز', color: default_color },
  { id: 28, letter: 'و', color: default_color },
  { id: 29, letter: 'ة', color: default_color },
  { id: 30, letter: 'ى', color: default_color },
  { id: 41, letter: 'ذ', color: default_color },
  { id: 42, letter: 'ر', color: default_color },
  { id: 43, letter: 'ؤ', color: default_color },
  { id: 44, letter: 'ء', color: default_color },
  { id: 45, letter: 'ئ', color: default_color },
]];

export const useStatusStore = defineStore('status', () => {
  const arKeys = ref<KEY[][]>(JSON.parse(JSON.stringify(initKeyboard)));
  const status = ref<string[]>([]); // for copy, when user win
  const completedGuesses = ref<string[][]>(createEmptyGrid());

  const wordStorage = useWordleStore();

  function setColorByLetter(letter: string, newColor: string) {
    for (const row of arKeys.value) {
      const key = row.find(k => k.letter === letter);
      if (key) {

        if (key.color === correct) break;

        key.color = newColor;
        break;
      }
    }
  }

  function submitGuess(userGuess: string[], target: string[]) {
    if (target.length !== 5 || userGuess.length !== 5) return;

    const list: STATUS[] = [-1, -1, -1, -1, -1];

    const letterCounts: Record<string, number> = {};
    for (const char of target) {
      letterCounts[char] = (letterCounts[char] || 0) + 1;
    }

    // Pass 1: Green matches
    for (let i = 0; i < 5; i++) {
      const char = userGuess[i];
      if (!char) continue;

      const condition = char === target[i];

      list[i] = condition ? 1 : -2;
      if (condition) setColorByLetter(char, correct);

      if (!condition && !target.includes(char)) setColorByLetter(char, disabled);

      else if (letterCounts[char] !== undefined && condition) letterCounts[char]--;
    }

    // Pass 2: Yellow matches
    for (let i = 0; i < 5; i++) {
      if (list[i] === 1) continue;

      const char = userGuess[i];
      if (char && letterCounts[char] && letterCounts[char] > 0) {
        list[i] = 0;
        setColorByLetter(char, half);
        letterCounts[char]--;
      }
    }

    const colors = list.map(s => {
      switch (s) {
        case 1: return correct;
        case 0: return half;
        case -2: return disabled;
        default: return default_color;
      }
    });

    completedGuesses.value[wordStorage.index] = colors;

    addStatus(list);
  }

  function addStatus(list: number[]) {
    const stack = list.map((e) => e === 1 ? '🟩' : e === 0 ? '🟨' : '⬛')
    status.value.push(stack.join(""));
  }

  const getStatus = computed(() => status.value.join("\n"))

  function resetStatus() {
    arKeys.value = JSON.parse(JSON.stringify(initKeyboard));
    status.value = [];
    completedGuesses.value = createEmptyGrid();
  }

  return { arKeys, resetStatus, getStatus, submitGuess, completedGuesses }
})
