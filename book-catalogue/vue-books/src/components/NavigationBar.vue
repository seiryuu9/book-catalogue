<template>
  <v-app-bar
    app
    elevation="2"
    color="primary"
  >
    <!-- Logo / názov appky -->
    <v-app-bar-title class="font-weight-bold">
      BadReads
    </v-app-bar-title>

    <!-- Navigácia -->
    <v-btn
      to="/"
      variant="text"
      class="mx-1"
    >
      Home
    </v-btn>

    <v-btn
      to="/books"
      variant="text"
      class="mx-1"
    >
      Books
    </v-btn>

    <v-spacer />

    <!-- Theme toggle -->
    <v-btn icon @click="toggleTheme" :title="themeLabel">
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

    themeLabel(): string {
      return this.themeStore.isDark ? 'light' : 'dark'
    },
  },

  methods: {
    toggleTheme(): void {
      this.themeStore.current = this.themeStore.isDark ? 'light' : 'dark'
    },
  },
})

</script>
