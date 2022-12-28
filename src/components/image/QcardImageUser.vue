<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
<template>
  <q-card flat bordered square class="my-card my-image-card" cursor="pointer">
    <q-img class="col" :ratio="4 / 3" v-bind="$attrs" spinner-color="red" />
    <q-card-actions horizontal class="justify-around q-px-md">
      <q-btn
        flat
        @click="emit('AddAsProfilImage')"
        round
        color="red"
        icon="portrait"
      >
        <q-tooltip>Ajouter en tant que photo de profil</q-tooltip>
      </q-btn>
      <q-btn
        flat
        @click="emit('openDialogdeleteUserImage')"
        round
        color="accent"
        icon="delete"
      >
        <q-tooltip>Supprimer l'image</q-tooltip>
      </q-btn>
      <q-btn flat round color="primary" icon="share" />
    </q-card-actions>
  </q-card>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'openDialogdeleteUserImage'): void;
  (e: 'AddAsProfilImage'): void;
}>();
</script>

<style lang="css"></style>
