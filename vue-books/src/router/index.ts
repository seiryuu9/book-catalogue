import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import BookView from "../views/BooksView.vue";
import AccountView from "../views/AccountView.vue";
import BookDetailView from "../views/BookDetailView.vue";
import BookDescription from "../components/BookDescription.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
        {
          path: "desc/:slug",
          name: "book-description",
          component: BookDescription,
          props: true,
        },
      ],
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
