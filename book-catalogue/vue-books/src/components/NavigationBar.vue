<template>
  <v-app-bar color="primary" >

    <v-app-bar-title class="font-weight-bold">
      BadReads
    </v-app-bar-title>

    <v-btn to="/" variant="text">
      Home
    </v-btn>

    <v-btn to="/books" variant="text">
      Books
    </v-btn>

    <v-btn to="/account" variant="text">
      Account
    </v-btn>

    <v-spacer />

    <v-btn icon @click="toggleTheme">
        <v-icon>{{ themeStore.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useThemeStore } from '../stores/theme'

export default defineComponent({
  name: 'NavigationBar',

  computed: {
    themeStore() {
      return useThemeStore()
    },
  },

  methods: {
    toggleTheme(): void {
      this.themeStore.current = this.themeStore.isDark ? 'light' : 'dark'
    },
  },
})

</script>
