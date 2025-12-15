<template>
  <v-container>
    <v-row>
      <v-col
        v-for="book in books"
        :key="book.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <router-link
          :to="`/books/${book.slug}`"
          class="router-link"
        >
          <BookCard :book="book" />
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BookCard from '@/components/BookCard.vue'
import books from '@/data/books.json'

export default defineComponent({
  name: 'BooksView',

  components: {
    BookCard,
  },

  data() {
    return {
      books,
    }
  },
})
</script>

<style scoped>
.router-link {
  text-decoration: none;
  color: inherit;
}
</style>
