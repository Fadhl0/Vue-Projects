import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IGif } from '@giphy/js-types';
import { useRouter } from 'vue-router';
const api = import.meta.env.VITE_GIPHY_API;


export const DEFUALT_SEARCH = "loop rose";

export const useGIFStore = defineStore('gify', () => {
  const columnCount = 4
  const gifColumns = ref<IGif[][]>(Array.from({ length: columnCount }, () => []))
  const offset = ref(0);
  const limit = ref(24);
  const querySearch = ref("");
  const total = ref(0);
  const currPage = ref(0);
  const isEmpty = ref(false);

  const router = useRouter();
  async function syncRoute() {
    await fetchGIF();

    if (router) {
      await router.push({
        query: { search: querySearch.value, page: currPage.value }
      });
    }
  }

  const fetchGIF = async () => {
    const search = querySearch.value || DEFUALT_SEARCH;

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${api}&q=${encodeURIComponent(search)}&limit=${limit.value}&offset=${offset.value}`;
    const response = await fetch(url);
    const result = await response.json();

    const cols: IGif[][] = Array.from({ length: columnCount }, () => [])

    if (result.data) {
      result.data.forEach((gif: IGif, index: number) => {
        cols[index % columnCount]!.push(gif)
      })
    }

    isEmpty.value = result.data.length <= 0;

    total.value = result.pagination.total_count || 0;
    gifColumns.value = cols;
    console.log("update")

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };

  async function goToPage(page: number) {
    currPage.value = page
    offset.value = page * limit.value
    await syncRoute()
  }

  async function nextPage() {
    goToPage(currPage.value + 1)
  }

  async function prevPage() {
    if (currPage.value > 0) {
      await goToPage(currPage.value - 1)
    }
  }

  async function executeSearch(query: string, page: number = 0) {
    querySearch.value = query
    goToPage(page);
  }

  return { querySearch, gifColumns, fetchGIF, nextPage, prevPage, executeSearch, goToPage, total, currPage, limit, isEmpty }
})
