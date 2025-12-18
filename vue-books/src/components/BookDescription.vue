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
import { defineComponent } from "vue";
import type { Book } from "../types/books";
import books from "../data/books.json";

export default defineComponent({
  name: "BookDescription",
    props: {
    slug: {
      type: String,
      required: true,
    },
  },

  computed: {
    book(): Book | undefined {
      return (books as Book[]).find(
        (b) => b.slug === this.slug
      )
    },
},
});
</script>
