<template>
  <q-page class="column items-center justify-center">
    <login-page
      @registerPage="isLoginPage = false"
      v-if="isLoginPage"
    ></login-page>
    <register-page @loginPage="isLoginPage = true" v-else></register-page>
  </q-page>
</template>

<script setup lang="ts">
import loginPage from 'pages/connexion/loginPage.vue';
import registerPage from 'pages/connexion/registerPage.vue';
import { ref } from 'vue';

const isLoginPage = ref(true);
</script>
