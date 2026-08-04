import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/MainApp.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'main',
      path: '/:pathMatch(.*)*',
      component: Home
    },
  ],
})

export default router
