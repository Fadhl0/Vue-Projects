import { createRouter, createWebHistory } from 'vue-router'
import main from "@/views/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Main',
      path: '/',
      component: main,
    },
    {
      name: '404',
      path: '/:pathMatch(.*)*',
      component: () => import("@/views/ErrorPage.vue"),
    }
  ],
})

export default router
