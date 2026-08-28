import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const KEY = 'searchHistory';
export const trendingList = ["cat", "cooked", "hamster", "eating", "bird", "goodnight", "minion popcorn"];

export const useHistoryStore = defineStore('history', () => {
  const initHistory = () => {
    const session = sessionStorage.getItem(KEY);
    if (session) {
      return JSON.parse(session) || [];
    }
    return []
  }

  const history = ref<string[]>(initHistory());

  function add(keyword: string) {
    const trimKeyword = keyword.trim();
    if (!trimKeyword) return;

    const dup = history.value.indexOf(trimKeyword);
    if (dup !== -1) {
      history.value.splice(dup, 1);
    }

    history.value.unshift(trimKeyword);
    sessionStorage.setItem(KEY, JSON.stringify(history.value));
  }

  const retriveHistory = computed(() => {
    const recent = history.value.slice(0, 7);

    const len = 7 - recent.length;
    const recentSet = new Set(recent);
    const trending = trendingList
      .filter(v => !recentSet.has(v))
      .slice(0, len);

    return {
      recent,
      trending
    };
  });

  return { add, retriveHistory }
})
