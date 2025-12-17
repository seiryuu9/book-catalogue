<template>
  <v-footer height="auto" class="pa-6 mt-10" color="primary" dark>
    <v-container>
      <v-row>
  
        <v-col cols="12" md="6">
          <h3 class="mb-2">BadReads</h3>
          <p>Email: info@badreads.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Book St, Library City</p>
        </v-col>

        <v-col cols="12" md="6">
          <h3 class="mb-3">Quick Links</h3>
          <div class="d-flex flex-column gap-2">
            <RouterLink to="/" class="footer-link">Home</RouterLink>
            <RouterLink to="/books" class="footer-link">Books</RouterLink>
            <RouterLink to="/account" class="footer-link">My account</RouterLink>
          </div>
        </v-col>

      </v-row>

      <v-divider class="my-4"></v-divider>

      <v-row justify="center">
        <span>&copy; {{ new Date().getFullYear() }} BadReads. All rights reserved. By Ema Radzová.</span>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
// ?? nic
</script>


<style scoped>
.footer-link {
  color: white;
  text-decoration: none;
}
.footer-link:hover {
  color: #996945; 
}
</style>

