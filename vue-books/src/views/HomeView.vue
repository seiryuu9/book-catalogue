<template>
  <v-container>
    
    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <v-img :src="libraryImage" alt="Library Image" 
           height="400px" class="rounded-lg" />
      </v-col>

      <v-col cols="12" md="6" class="d-flex flex-column justify-center">
        <h1>Welcome to BadReads!</h1>
        <p>
          Discover new books, read reviews, and share your thoughts with our
          community of book lovers. Whether you're into fiction, non-fiction,
          or anything in between, BadReads has something for everyone. Find inspiration 
          for your next read and connect with fellow readers today!
        </p>
      </v-col>
    </v-row>

    <v-divider class="my-10" />

      <v-row class="mb-10 align-center">
      
      <v-col cols="12" md="3" class="text-right">
        <h3 class="d-flex align-center justify-end mb-3">
          Find your next read
          <v-icon class="ma-2">mdi-book-heart-outline</v-icon>
        </h3>

        <p>
          Browse through a curated selection of books loved by our community.
          From timeless classics to modern bestsellers, there is always something
          new to discover.
        </p>
      </v-col>

      <v-col cols="12" md="6">
        <v-img :src="readingCornerImage" alt="Reading Corner Image"
          height="500" class="rounded-lg" contain />
      </v-col>

      <v-col cols="12" md="3">
        <h3 class="d-flex align-center mb-3">
          <v-icon class="ma-2">mdi-book-open-page-variant</v-icon>
          Relax & explore
        </h3>

        <p>
          Create your own reading corner experience. Save your favourite books,
          read reviews, and keep track of what you have read or want to read next.
        </p>
      </v-col>
    </v-row>

    <v-divider class="my-10" />
    <h2 class="mb-4">Our favourites</h2>

    <v-row justify="center">
      <v-col v-for="book in featuredBooks" :key="book.id"
        cols="12" sm="6" md="3">

        <BookCard :book="book" class="cursor-pointer" 
          @click="goToBook(book.slug)"/>

      </v-col>
    </v-row>
   
    <router-view class="mt-8" /> <!-- pre desc -->

    <v-row class="mt-4">
      <v-col class="text-center">
        <v-btn color="primary" @click="$router.push('/books')">
          Show all books
        </v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import BookCard from "../components/BookCard.vue"
import { useBooksStore } from "../stores/books"
import type { Book } from "../types/booksTypes.ts"

export default defineComponent({
  name: "HomeView",

  components: {
    BookCard,
  },

  data() {
    return {
      libraryImage: "../images/library.jpg",
      readingCornerImage: "../images/corner.jpg",
    }
  },

  computed: {
    booksStore() {
      return useBooksStore()
    },

    featuredBooks(): Book[] {
      return this.booksStore.books.slice(0, 3)
    },
  },

  methods: {
    goToBook(slug: string) {
      this.$router.push(`/desc/${slug}`)
    },
  }
})
</script>