<template>
  <v-card v-if="book">
    <v-card-title>{{ book.title }}</v-card-title>

    <v-card-text>
      <strong>Author:</strong> {{ book.author }}
      <p class="mt-2">{{ book.description }}</p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useBooksStore } from '../stores/books'
import type { Book } from '../types/booksTypes'

export default defineComponent({
  name: 'BookDescription',

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
})
</script>

