<template>
  <v-card class="cursor-pointer" elevation="3">

    <v-img :src="imageSrc" height="400" cover/>

    <v-card-title class="text-center">
      {{ book.title }}
    </v-card-title>

  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Book } from '../types/booksTypes'

export default defineComponent({
  name: 'BookCard',

  props: {
    book: {
      type: Object as PropType<Book>, // ocakava, ze mu booksview posle konkretny book, proptype pre ts z types
      required: true,
    },
  },
  computed: {
    imageSrc(): string {
      // BASE_URL + relativna cesta z jsonu
      return `${import.meta.env.BASE_URL}${this.book.image}`
    },
  },
})
</script>
