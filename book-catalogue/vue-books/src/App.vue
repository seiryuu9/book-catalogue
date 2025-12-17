<template>
  <v-theme-provider :theme="themeStore.current">
    <v-app class="mt-10">
      <NavigationBar />
      <v-main>
        <router-view />
      </v-main>
      <FooterBar />
    </v-app>
  </v-theme-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationBar from './components/NavigationBar.vue'
import { useThemeStore } from './stores/theme.ts'
import FooterBar from './components/FooterBar.vue';

export default defineComponent({
  name: 'App',
  components: { NavigationBar, FooterBar },
  computed: {
    themeStore() {
      return useThemeStore()
    }
  }
})
</script>
