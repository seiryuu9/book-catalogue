<template>
  <v-container>
    <v-row>
      <v-col v-for="book in books" :key="book.id"
        cols="12" sm="6" md="4" lg="3">

        <router-link :to="`/books/${book.slug}`" class="text-decoration-none">
          <BookCard :book="book" />
        </router-link>

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BookCard from '../components/BookCard.vue'
import booksData from '../data/books.json'
import type { Book } from '../types/books'

export default defineComponent({
  name: 'BooksView',

  components: {
    BookCard,
  },

  data() {
    return {
      books: booksData as Book[],
    }
  },
})
</script>

