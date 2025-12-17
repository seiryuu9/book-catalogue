<template>
    <v-btn variant="text" color="primary" to="/books" prepend-icon="mdi-arrow-left" class="mb-4">
    Back
    </v-btn>

  <v-container v-if="book">
    <v-row>
      <v-col cols="12" md="4">
        <v-img :src="book.image"/>
      </v-col>

      <v-col cols="12" md="8">
        <h1>{{ book.title }}</h1>
        <!--tag-->
        <v-chip 
        v-for="genre in book.genre" :key="genre"
         color="primary" variant="outlined" class="ma-1">
        {{ genre }}
        </v-chip>

        <h3 class="text-subtitle-1 my-3">Author: {{ book.author }}</h3>
        
        <p class="my-2">{{ book.description }}</p>

        <div class="d-flex justify-end">
            <v-btn variant="text" color="primary"
            :href="book.source" target="_blank">
            Source
            </v-btn>
        </div>

        <v-divider class="my-6" />

        <Reviews :reviews="book.reviews" />

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import books from '../data/books.json'
import Reviews from '../components/Reviews.vue'

export default defineComponent({
  name: 'BookDetailView', // useful pre debugging

  components: {
    Reviews,
  },

  //hodnoty od rodica (z routeru)
  props: {
    slug: {
      type: String,
      required: true,
    },
  },

  computed: {
    book() {
      return books.find(book => book.slug === this.slug) // hlada v jsone, pre v-if v containeri
    },
    },
  },
)
</script>

