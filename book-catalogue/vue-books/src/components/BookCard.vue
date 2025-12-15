<template>
  <v-card
    class="book-card"
    elevation="3"
    hover
  >
    <v-img
      :src="book.image"
      height="400"
      cover
    />

    <v-card-title class="text-center">
      {{ book.title }}
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BookCard',

  props: {
    book: {
      type: Object,
      required: true,
    },
  },
})
</script>

<style scoped>
.book-card {
  cursor: pointer;
}
</style>
