<template>
  <v-btn variant="text" color="primary"
    to="/books" prepend-icon="mdi-arrow-left" class="mb-4" >
    Back
  </v-btn>

  <v-container v-if="book">
    <v-row>
      <v-col cols="12" md="4">
        <v-img :src="`/${book.image}`" />
      </v-col>

      <v-col cols="12" md="8">
        <h1>{{ book.title }}</h1>

        <!-- tagy -->
        <v-chip v-for="genre in book.genre" :key="genre"
          color="primary" variant="outlined" class="ma-1" >
          {{ genre }}
        </v-chip>

        <h3 class="text-subtitle-1 my-3">Author: {{ book.author }}</h3>

        <p class="my-2">{{ book.description }}</p>

        <div class="d-flex justify-end">
          <v-btn variant="text" color="primary"
            :href="book.source" target="_blank" >
            Source
          </v-btn>
        </div>

        <v-divider class="my-6" />

        <Reviews />

        <v-divider class="my-6" />

        <AddReview />

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import { useBooksStore } from '../stores/books'
import Reviews from '../components/Reviews.vue'
import AddReview from '../components/AddReview.vue'
import type { Book } from '../types/booksTypes'

export default defineComponent({
  name: 'BookDetailView',

  components: {
    Reviews,
    AddReview,
  },

  props: {
    slug: {
      type: String,
      required: true,
    },
  },

  computed: {
    booksStore() {
      return useBooksStore()
    },

    book(): Book | undefined {
      return this.booksStore.getBookBySlug(this.slug)
    },
  },

  // v rodicovi pouzivam provide na poslanie dat do deti
  watch: {
    book: { // vzdy ked sa zmeni hodnota book, zavola sa handler
      immediate: true, // spusti sa aj pri vytvoreni komponentu
      handler(newBook) {
        // provide po tom, ako book existuje
        if (newBook) {
          provide('book', newBook)
          provide('bookSlug', newBook.slug)
        }
      },
    },
    '$route.params.slug': { // sleduje zmeny parametra slug v route
        immediate: true,
        handler(newSlug) {
          // refresh dat pri zmene slug
          this.booksStore.getBookBySlug(newSlug)
    }
  }
  },
})
</script>
