import { CalculationMethod } from 'adhan';
import { defineStore } from 'pinia';

export const KEY = 'VUE_DAILY_SALAH_METHOD';

export type Method = { name: string, id: number };
const methodKeys = Object.keys(CalculationMethod);

const list: Method[] = methodKeys.map((v, i) => ({
  name: v.replace(/([a-z])([A-Z])/g, '$1 $2'),
  id: i + 1,
}));

const DEFAULT_METHOD: Method = {
  name: "Umm Al Qura",
  id: 3
};

function initLoad(): Method {
  const saved = localStorage.getItem(KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      const found = list.find(
        (m) => m.name === parsed.name || m.id === parsed.id
      );
      if (found) return found;
    } catch (e) {
      console.error('Failed to parse calculation method from localStorage', e);
    }
  }
  return DEFAULT_METHOD;
}

export const useCalcMethodStore = defineStore('calc', {
  state: (): Method => initLoad(),

  getters: {
    getMethodName(state): string {
      return state.name;
    },
  },
  actions: {
    getMethodList(): Method[] {
      return list;
    },
    setMethod(newMethod: Method | null) {

      if (!newMethod) return;

      const validation = list.some(e => newMethod.name === e.name && newMethod.id === e.id);

      if (!validation) return;

      this.id = newMethod.id;
      this.name = newMethod.name;

      localStorage.setItem(KEY, JSON.stringify(newMethod))
    }
  }
});
