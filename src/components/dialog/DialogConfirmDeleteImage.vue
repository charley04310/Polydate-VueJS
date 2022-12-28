<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({});
</script>
<template>
  <q-dialog persistent>
    <q-card class="q-pa-md">
      <q-card-section v-if="!imageIsUpdated" class="row items-center">
        <span class="text-h5 text-center q-pa-md q-ml-sm"
          >Êtes-vous sur de vouloir <br />
          supprimer l'image ?</span
        >

        <q-img :ratio="4 / 3" v-bind="$attrs" spinner-color="red" />
      </q-card-section>

      <q-card-section v-else class="row items-center">
        <q-avatar icon="edit" text-color="primary" />
        <span class="text-h5 q-ml-sm"
          >Image a correctement était supprimé! <br />
        </span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          :label="imageIsUpdated ? 'Retour' : 'Annuler'"
          color="green"
          v-close-popup
          @click="imageIsUpdated = false"
        />
        <q-btn
          v-if="!imageIsUpdated"
          label="Supprimer"
          @click="deleteUserImage"
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'deleteUserImage'): void;
}>();

const imageIsUpdated = ref(false);

const deleteUserImage = async () => {
  emit('deleteUserImage');

  imageIsUpdated.value = true;
};
</script>
