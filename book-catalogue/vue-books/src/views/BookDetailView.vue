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

        <h3 class="my-2">Reviews</h3>

        <v-select v-model="selectedRating" :items="ratingOptions" label="Filter by ratings"
        clearable class="mb-4" density="compact"/> <!-- rozbalovaci filter, items - pole moznosti, vmodel viaze vybrane na data()-->

        <v-card
        v-for="(review, index) in filteredReviews" :key="index"
        class="mb-3" variant="outlined">

        <v-card-title class="text-subtitle-2">
            {{ review.user }}
        </v-card-title>

        <v-card-text>
            <v-rating :model-value="review.rating"
            readonly density="compact"/>
            <p class="mt-2">{{ review.text }}</p>
        </v-card-text>
        </v-card>

        <p v-if="filteredReviews.length === 0">
        No reviews found.
        </p>


      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import books from '@/data/books.json'

export default defineComponent({
  name: 'BookDetailView',

  props: {
    slug: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      selectedRating: null as number | null,
    }
  },

  computed: {
    book() {
      return books.find(book => book.slug === this.slug)
    },

    ratingOptions(): number[] {
      return [5, 4, 3, 2, 1]
    },

    filteredReviews() {
      if (!this.book) return []

      if (!this.selectedRating) {
        return this.book.reviews
      }

      return this.book.reviews.filter(
        review => review.rating === this.selectedRating
      )
    },
  },
})
</script>

