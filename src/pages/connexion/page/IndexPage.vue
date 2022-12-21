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
import { useAuthStore } from 'src/stores/authStore';
import { ref } from 'vue';
const authStore = useAuthStore();

const switchPageConnexion = () => {
  isLoginPage.value = !isLoginPage.value;
  authStore.isNewUser = false;
};
const isLoginPage = ref(true);
</script>
