import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from 'vue-router' // typovanie pre routes

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"), // lazy loading komponentov views
    children: [
        {
          path: "desc/:slug",
          name: "book-description",
          component: () => import("../components/BookDescription.vue"),
          props: true, // properties, ktore dostane komponent zvonku, napr slug z URL
        },
      ],
  },
  {
    path: "/books",
    name: "books",
    component: () => import("../views/BooksView.vue"),
  },
  {
    path: '/books/:slug',
    name: 'book-detail',
    component: () => import("../views/BookDetailView.vue"),
    props: true 
  },
  {
    path: "/account",
    name: "account",
    component: () => import("../views/AccountView.vue"),
  },
  {
    path: '/:pathMatch(.*)*', // zachyti vsetky neexistujuce cesty, musi byt na konci
    name: 'not-found',
    component: () => import("../views/NotFoundView.vue"),
  }
];

const router = createRouter({
  history: createWebHistory('/book-catalogue/'), 
  routes,
});

export default router;
