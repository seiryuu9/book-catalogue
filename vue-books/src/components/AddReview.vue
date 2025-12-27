<template>
  <div v-if="auth.isLoggedIn"> <!-- zobrazi sa, len ked je user prihlaseny -->
    <h3 class="my-4">Add Review</h3>

    <v-rating v-model="rating" density="compact" />

    <v-textarea v-model="text" label="Your review" rows="3" />

    <v-btn color="primary" class="mt-3"
      :disabled="!rating || !text" @click="submitReview" > <!-- submit je disabled ak je aspon jedna z hodnot prazdna (!0)-->
      Submit review
    </v-btn>

    <!-- dialog, ak user uz reviewoval -->
    <v-dialog persistent v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Oops!</v-card-title>
        <v-card-text>You've already reviewed this book.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue' // inject je vlastne namiesto props
import { useAuthStore } from '../stores/auth'
import { useBooksStore } from '../stores/books'

export default defineComponent({
  name: 'AddReview',

  data() {
    return {
      rating: 0,
      text: '',
      dialog: false as boolean, 
      injectedBookSlug: '' as string,
      injectedBookTitle: '' as string,
    }
  },

  computed: {
    auth() {
      return useAuthStore()
    },
    booksStore() {
      return useBooksStore()
    },
  },

  created(){
    this.injectedBookSlug = inject('bookSlug', '')
    const book = inject('book', { title: '' })
    this.injectedBookTitle = book.title
  },

  methods: {
    submitReview() {
      if (!this.auth.currentUser) return

      const success = this.booksStore.addReview(this.injectedBookSlug, {
        title: this.injectedBookTitle,
        user: this.auth.currentUser.username,
        rating: this.rating,
        text: this.text,
      })

      if (!success) {
        this.dialog = true  // ak recenzia existuje, otvori dialog
      } else {
        // uspesne pridanie - reset formulara
        this.rating = 0
        this.text = ''
      }
    },
  },
})
</script>
