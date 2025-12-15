import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import BookView from "../views/BooksView.vue";
import AccountView from "../views/AccountView.vue";
import BookDetailView from "../views/BookDetailView.vue";

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
  {
  path: '/books/:slug',
  name: 'book-detail',
  component: BookDetailView,
  props: true
  },
  {
    path: "/account",
    name: "account",
    component: AccountView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
