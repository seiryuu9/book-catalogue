<template>
  <v-container>
    <!-- login -->
    <v-row justify="center" v-if="!auth.isLoggedIn">
      <v-col cols="12" md="5">
        <v-card>
          <v-card-title>Login</v-card-title>

          <v-card-text>
            <v-text-field v-model.trim="username" label="Username" />

            <v-text-field v-model.trim="password" label="Password" type="password" />

            <v-alert v-if="error" type="error" class="mb-3" >
              Wrong username or password
            </v-alert>

            <v-btn color="primary" block @click="handleLogin" >
              Login
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- profil po lognuti -->
     
    <v-row justify="center" v-else>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-text class="text-center">
            
            <v-avatar size="120" class="mb-4">
              <v-img :src="avatarSrc" cover />
            </v-avatar>

            <h2>{{ auth.currentUser?.username }}</h2>

            <p class="text-medium-emphasis">
              {{ auth.currentUser?.bio }}
            </p>

            <v-divider class="my-6" />
          
            <Reviews v-if="myReviews.length" :reviews="myReviews" 
              :clickable="true" />
     
            <v-divider class="my-6" />

            <v-btn color="red" variant="outlined" @click="auth.logout" >
              Logout
            </v-btn>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useBooksStore } from '../stores/books'
import Reviews from '../components/Reviews.vue'
import type { Book, UserReview } from '../types/booksTypes'

export default defineComponent({
  name: 'AccountView',

  components: {
    Reviews,
  },

  data() {
    return {
      username: '',
      password: '',
      error: false,
    }
  },

  computed: {
    auth() {
      return useAuthStore()
    },

    booksStore() {
      return useBooksStore()
    },

    myReviews(): (UserReview)[] {
      if (!this.auth.currentUser) return []

      const currentUsername = this.auth.currentUser.username

      return this.booksStore.books.flatMap((book: Book) =>
        book.reviews
          .filter(r => r.user === currentUsername)
          .map(r => ({ ...r, bookSlug: book.slug }))
      )
    },

    avatarSrc(): string {
      // ak currentUser existuje, pripoj BASE_URL k jeho avatar ceste
      return this.auth.currentUser?.avatar
        ? `${import.meta.env.BASE_URL}${this.auth.currentUser.avatar}`
        : ''
    },
  },

  methods: {
    handleLogin() {
      const success = this.auth.login(this.username, this.password)
      this.error = !success
    },
  },
})
</script>
