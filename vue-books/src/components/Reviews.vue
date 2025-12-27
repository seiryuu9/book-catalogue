<template>
  <div>
    <h3 class="my-2">Reviews</h3>

    <v-select v-model="selectedRating" :items="ratingOptions"
      label="Filter by rating" clearable class="mb-4" density="compact" />

    <div v-if="filteredReviews.length">
      <v-card v-for="review in filteredReviews" :key="review.user + review.text + review.rating"
        class="mb-3" variant="outlined" 
        @click="goToBook(review)" >

        <v-btn v-if="!clickable && auth.currentUser?.username === review.user" 
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
    </div>
    <div v-else class="text-center my-4">
      <p>
        No reviews found.
      </p>
    </div>

    <!-- dialog na potvrdenie mazania -->
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
import { defineComponent, inject, type PropType } from 'vue'
import type { UserReview, Review } from '../types/booksTypes'
import { useAuthStore } from '../stores/auth'
import { useBooksStore } from '../stores/books'
import router from '../router'

export default defineComponent({
  name: 'Reviews',

  props: {
    clickable: {
      type: Boolean,
      default: false,
    },
    reviews: {
      type: Array as PropType<Review[]>,
      default: () => [],
    },
  },

  data() {
    return {
      selectedRating: null as number | null, // znaci, ze null moze byt neskor cislo
      dialog: false,
      reviewToDelete: null as Review | null,
      injectedBook: inject('book', null) as { reviews: Review[] } | null, // ziskam book z rodica
      injectedBookSlug: inject('bookSlug', '') as string | null,
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
      const reviewsSource = this.reviews.length ? this.reviews : this.injectedBook?.reviews ?? []
      if (!reviewsSource) return []
      if (!this.selectedRating) return reviewsSource
      return reviewsSource.filter(r => r.rating === this.selectedRating)
    },
  },

  methods: {
    confirmDelete(review: Review) {
      this.reviewToDelete = review
      this.dialog = true
    },

    deleteConfirmed() {
      if (!this.injectedBookSlug || !this.reviewToDelete) return

      this.booksStore.deleteReview(this.injectedBookSlug, this.reviewToDelete)
      this.reviewToDelete = null
      this.dialog = false
    },

    goToBook(review: Review) {
      if (!this.clickable) return

      const r = review as UserReview
      if (r.bookSlug) {
        router.push({ name: 'book-detail', params: { slug: r.bookSlug } }) // dostanem books/:slug, inak by ma nehodilo na detail knihy, len zmenilo URL
      }
    },
  },
})
</script>
