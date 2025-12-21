import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import BookView from "../views/BooksView.vue";
import AccountView from "../views/AccountView.vue";
import BookDetailView from "../views/BookDetailView.vue";
import BookDescription from "../components/BookDescription.vue";
import NotFoundView from '../views/NotFoundView.vue'


import type { RouteRecordRaw } from 'vue-router' // typovanie pre routes

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
        {
          path: "desc/:slug",
          name: "book-description",
          component: BookDescription,
          props: true, // properties, ktore dostane komponent zvonku, napr slug z URL
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
  {
    path: '/:pathMatch(.*)*', // zachyti vsetky neexistujuce cesty, musi byt na konci
    name: 'not-found',
    component: NotFoundView,
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
