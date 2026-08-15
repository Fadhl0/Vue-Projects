import { computed } from "vue"

export const getRandomInt = (min: number, max: number) => computed<number>(() => {
  return Math.floor(Math.random() * (max - min + 1)) + min
})
