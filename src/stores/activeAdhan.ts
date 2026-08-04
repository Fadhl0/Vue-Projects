import { defineStore } from "pinia";

export const useActiveStore = defineStore('active', {
  state: () => ({
    active: 0,
  }),

  getters: {
    getActive(state): number {
      return state.active;
    },
  },
  actions: {
    setActive(num: number) {
      if (num > 5 || num < 0) return;

      this.active = num;
    }
  }
});
