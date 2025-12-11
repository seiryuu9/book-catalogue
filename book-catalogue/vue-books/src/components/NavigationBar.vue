<template>
  
    <v-btn @click="toggleTheme">
      {{ themeLabel }}
    </v-btn>
  
</template>

<script>
import { useThemeStore } from "../stores/theme";

export default {
  name: "NavigationBar",

  data() {
    return {
      themeStore: useThemeStore()
    };
  }
};
</script>


