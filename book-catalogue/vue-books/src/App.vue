<template>
  <v-theme-provider :theme="themeStore.theme" >
    <v-app>
      <NavigationBar />
       <!-- nav bar a router view -->
      
    </v-app>
  </v-theme-provider>
  
</template>

<script>
import { useThemeStore } from "./stores/theme";
import NavigationBar from "./components/NavigationBar.vue";

export default {
  name: "App",

  components: {
    NavigationBar
  },

  data() {
    return {
      themeStore: useThemeStore()  // ukladame store do data
    };
  },

  computed: {
    theme() {
      return this.themeStore.theme;
    }
  }
};
</script>

