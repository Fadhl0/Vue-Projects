import { defineStore } from "pinia";

export const KEY = "VUE_DAILY_SALAH_ADJECT"

function initLoad(): number {
  const saved = localStorage.getItem(KEY);
  if (saved !== null) {
    const parsed = Number(saved);
    if (!isNaN(parsed)) {
      return parsed;
    }
  }
  return 0;
}

export const useAdjectStore = defineStore('adject', {
  state: () => ({
    adject: initLoad(),
  }),

  getters: {
    getAdject(state): number {
      return state.adject;
    },
  },
  actions: {
    saveAdject() {
      localStorage.setItem(KEY, String(this.adject));
    },
    increament() {
      this.adject++;
      this.saveAdject();
    },
    decreament() {
      this.adject--;
      this.saveAdject();
    }
  }
});
