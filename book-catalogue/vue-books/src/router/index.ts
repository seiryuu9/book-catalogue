import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import BookView from "../views/BooksView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/books",
    name: "books",
    component: BookView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
