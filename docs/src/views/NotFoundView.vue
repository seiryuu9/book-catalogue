<template>
  <v-container class="text-center mt-10">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h5">
            404 – Page doesn't exist
          </v-card-title>

          <v-card-text>
            Page not found.
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn color="primary" to="/">
              Back to Home
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFoundView'
})
</script>
