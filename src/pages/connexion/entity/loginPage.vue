<script lang="ts">
import { ILoginUser, useAuthStore } from 'src/stores/authStore';
import QInputMail from 'src/components/input/QInputMail.vue';
import QInputPassword from 'src/components/input/QInputPassword.vue';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
</script>

<template>
  <q-card flat class="text-black q-pa-md">
    <q-item>
      <q-item-section>
        <q-item-label class="text-center text-h5"> CONNEXION</q-item-label>
      </q-item-section>
    </q-item>

    <div class="q-gutter-y-md q-mt-sm">
      <QInputMail type="email" v-model="userLogin.userEmail" />
      <QInputPassword filled v-model="userLogin.userPassword" />
    </div>

    <div class="column q-gutter-y-md q-mt-sm text-secondary">
      <q-btn
        class="q-mx-none"
        @click="login"
        color="primary"
        label="SE CONNECTER"
      />
      <q-btn
        class="q-mx-none"
        color="accent"
        text-color="white"
        label="Créer un compte"
        @click="emit('registerPage')"
      />
      <q-btn flat text-color="secondary" label="Mot de passe oublié" />
    </div>
  </q-card>
</template>

<script setup lang="ts">
const $q = useQuasar();

const authStore = useAuthStore();

const emit = defineEmits<{
  (e: 'registerPage'): void;
}>();
const userLogin = ref<ILoginUser>({
  userEmail: '',
  userPassword: '',
});

const login = async () => {
  try {
    await authStore.loginUser(userLogin.value);
  } catch (error) {
    $q.notify({
      message: 'Problème identifiants incorrect!',
      color: 'red-4',
      textColor: 'white',
      icon: 'check_circle',
      position: 'top',
    });
  }
};
</script>
