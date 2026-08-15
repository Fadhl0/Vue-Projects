import GamePage from '@/views/GamePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'game',
      component: GamePage,
      path: '/'
    },
    {
      name: '404',
      component: () => import('@/views/NotFound.vue'),
      path: "/:pathMatch(.*)*",
    }
  ],
})

export default router
