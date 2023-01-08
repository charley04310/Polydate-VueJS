<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
<template>
  <q-card flat bordered square class="my-card my-image-card">
    <q-img
      cursor="pointer"
      @click="emit('openDialogdeleteUserImage')"
      class="col cursor-pointer"
      :ratio="16 / 9"
      v-bind="$attrs"
      spinner-color="red"
    >
      <q-tooltip>Supprimer l'image</q-tooltip>
    </q-img>
  </q-card>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'openDialogdeleteUserImage'): void;
  (e: 'AddAsProfilImage'): void;
}>();
</script>

<style lang="css"></style>
