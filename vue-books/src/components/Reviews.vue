<template>
  <div>
    <h3 class="my-2">Reviews</h3>

    <v-select
      v-model="selectedRating"
      :items="ratingOptions"
      label="Filter by rating"
      clearable
      class="mb-4"
      density="compact"
    />

    <v-card
      v-for="(review, index) in filteredReviews"
      :key="index"
      class="mb-3"
      variant="outlined"
    >
      <v-card-title class="text-subtitle-2">
        {{ review.user }}
      </v-card-title>

      <v-card-text>
        <v-rating
          :model-value="review.rating"
          readonly
          density="compact"
        />
        <p class="mt-2">{{ review.text }}</p>
      </v-card-text>
    </v-card>

    <p v-if="filteredReviews.length === 0">
      No reviews found.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Review } from '../types/books'

export default defineComponent({
  name: 'ReviewList',

  props: {
    reviews: {
      type: Array as PropType<Review[]>,
      required: true,
    },
  },

   data() { // reaktivne premenne, ktore sa menia
    return {
      selectedRating: null as number | null, // znaci ze null moze byt nesko cislo, kvoli ts
    }
  },

  computed: {
    ratingOptions(): number[] {
      return [5, 4, 3, 2, 1]
    },

    filteredReviews(): Review[] {
      if (!this.selectedRating) {
        return this.reviews
      }

      return this.reviews.filter(
        review => review.rating === this.selectedRating
      )
    },
  },
})
</script>
