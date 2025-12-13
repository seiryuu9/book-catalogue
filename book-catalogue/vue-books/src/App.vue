<template>
  <v-theme-provider :theme="themeStore.current">
    <v-app>
      <NavigationBar />
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </v-theme-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationBar from './components/NavigationBar.vue'
import { useThemeStore } from './stores/theme.ts'

export default defineComponent({
  name: 'App',
  components: { NavigationBar },
  computed: {
    themeStore() {
      return useThemeStore()
    }
  }
})
</script>
