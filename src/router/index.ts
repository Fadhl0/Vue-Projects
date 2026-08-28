import { DEFUALT_SEARCH, useGIFStore } from '@/stores/Gify'
import GifPage from '@/views/GifPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: GifPage
    },
    {
      name: "notFound",
      path: "/:pathMatch(.*)*",
      component: () => import('@/views/NotFound.vue'),
    }
  ],
})

router.afterEach(to => {
  if (to.name != "home") return;

  console.log()
  const searchParam = (to.query.search as string) || DEFUALT_SEARCH
  const pageParam = parseInt(to.query.page as string, 10) || 0

  const store = useGIFStore()
  if (store.querySearch !== searchParam || store.currPage !== pageParam) {
    store.executeSearch(searchParam, pageParam)
  }
})

export default router
