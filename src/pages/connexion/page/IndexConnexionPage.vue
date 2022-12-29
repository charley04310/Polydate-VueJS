<template>
  <q-page class="column items-center justify-center">
    <login-page
      @registerPage="switchPageConnexion"
      v-if="isLoginPage"
    ></login-page>

    <register-page @loginPage="switchPageConnexion" v-else></register-page>
  </q-page>
</template>

<script setup lang="ts">
import loginPage from 'src/pages/connexion/entity/loginPage.vue';
import registerPage from 'src/pages/connexion/entity/registerPage.vue';
import { ref } from 'vue';

const switchPageConnexion = () => {
  isLoginPage.value = !isLoginPage.value;
};
const isLoginPage = ref(true);
</script>
