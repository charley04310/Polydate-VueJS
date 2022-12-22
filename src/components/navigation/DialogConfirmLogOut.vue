<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
<template>
  <q-dialog persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="logout" text-color="primary" />
        <span class="text-h5 q-ml-sm"
          >Êtes-vous sur de vouloir vous déconnecter ?</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="annuler" color="green" v-close-popup />
        <q-btn
          label="se déconnecter !"
          color="primary"
          @click="authStore.logoutUser"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/authStore';
const authStore = useAuthStore();
</script>
