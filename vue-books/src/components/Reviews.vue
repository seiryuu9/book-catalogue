<template>
  <div>
    <h3 class="my-2">Reviews</h3>

    <v-select v-model="selectedRating" :items="ratingOptions"
      label="Filter by rating" clearable class="mb-4" density="compact" />

    <v-card v-for="review in filteredReviews" :key="review.user + review.text + review.rating"
      class="mb-3" variant="outlined">

      <v-btn v-if="auth.currentUser?.username === review.user" 
        icon="mdi-delete" size="small" variant="text" color="error" class="float-right"
        @click="confirmDelete(review)" />

      <v-card-title class="text-subtitle-1 font-weight-bold">
        {{ review.user }}
      </v-card-title>

      <v-card-text>
        <v-rating :model-value="review.rating"
          readonly density="compact" />

        <p class="text-caption text-grey">
          {{ review.title }}
        </p>

        <p class="mt-2">{{ review.text }}</p>
      </v-card-text>

    </v-card>

    <p v-if="filteredReviews.length === 0">
      No reviews found.
    </p>

    <!-- Dialog na potvrdenie mazania -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>

        <v-card-title class="headline">Confirm delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this review?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text color="error" @click="deleteConfirmed">Delete</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Review } from '../types/booksTypes'
import { useAuthStore } from '../stores/auth'
import { useBooksStore } from '../stores/books'

export default defineComponent({
  name: 'ReviewList',

  props: {
    reviews: {
      type: Array as PropType<Review[]>,
      required: true,
    },
    bookSlug: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      selectedRating: null as number | null, // znaci, ze null moze byt neskor cislo
      dialog: false,
      reviewToDelete: null as Review | null,
    }
  },

  computed: {
    auth() {
      return useAuthStore()
    },
    booksStore() {
      return useBooksStore()
    },
    ratingOptions(): number[] {
      return [5, 4, 3, 2, 1]
    },
    filteredReviews(): Review[] {
      if (!this.selectedRating) return this.reviews
      return this.reviews.filter(r => r.rating === this.selectedRating)
    },
  },

  methods: {
    confirmDelete(review: Review) {
      this.reviewToDelete = review
      this.dialog = true
    },

    deleteConfirmed() {
      if (this.reviewToDelete) {
        this.booksStore.deleteReview(this.bookSlug, this.reviewToDelete)
        this.reviewToDelete = null
      }
      this.dialog = false
    },
  },
})
</script>
