<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
<template>
  <q-dialog persistent>
    <q-card class="q-pa-md">
      <q-card-section class="row items-center">
        <q-avatar icon="edit" text-color="primary" />
        <span class="text-h5 q-ml-sm"
          >Êtes-vous sur de vouloir <br />enregistrer les modifications ?</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Annuler" color="green" v-close-popup />
        <q-btn label="Modifier mon profil" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
/* import { useAuthStore } from 'src/stores/authStore';
const authStore = useAuthStore(); */
</script>
