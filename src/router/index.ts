import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      path: "/",
    },
    {
      name: "picture-page",
      component: () => import("@/views/PictureView.vue"),
      path: "/pictures/:pictureId"
    },
    {
      name: "favorites",
      component: () => import("@/views/FavoritesView.vue"),
      path: "/favorites"
    },
  ]
})

export default router
