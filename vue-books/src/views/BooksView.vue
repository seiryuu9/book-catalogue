<template>
  <v-container>
   
    <v-row class="mb-6">
      <v-col cols="12" md="4">
        <v-select v-model="selectedGenre" :items="genres"
          label="Filter by genre" clearable />
      </v-col>
    </v-row> 

    <v-row>
      <v-col v-for="book in filteredBooks" :key="book.id"
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
import { useBooksStore } from '../stores/books';
import type { Book } from '../types/booksTypes'

export default defineComponent({
  name: 'BooksView',

  components: {
    BookCard,
  },

  data() {
    return {
      selectedGenre: null as string | null, 
    }
  },

  computed: {
    booksStore() {
      return useBooksStore() // pristup k store
    },

    books(): Book[] {
      return this.booksStore.books // cita knihy zo store
    },

    genres(): string[] {
      const allGenres = this.books.flatMap(book => book.genre) // flatten pole zanrov - polia do jedneho pola
      return Array.from(new Set(allGenres)) // set zachova len unikatne zanre, array ho premeni spat na pole
    },

    filteredBooks(): Book[] { // computed sa automaticky prepocita len pri zmeneni filtra, ma cache
      if (!this.selectedGenre) return this.books
      return this.books.filter(book => book.genre.includes(this.selectedGenre))
    },
  },
})
</script>


