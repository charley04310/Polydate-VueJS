<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({});
</script>
<template>
  <q-dialog persistent>
    <q-card class="q-pa-md">
      <q-card-section v-if="!profilUpdated" class="row items-center">
        <q-avatar icon="edit" text-color="primary" />
        <span class="text-h5 q-ml-sm"
          >Êtes-vous sur de vouloir <br />enregistrer les modifications ?</span
        >
      </q-card-section>

      <q-card-section v-else class="row items-center">
        <q-avatar icon="edit" text-color="primary" />
        <span class="text-h5 q-ml-sm"
          >Vos données on bien été mise à jour ! <br />
        </span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          :label="profilUpdated ? 'Retour' : 'Annuler'"
          color="green"
          v-close-popup
        />
        <q-btn
          v-if="!profilUpdated"
          label="Modifier mon profil"
          @click="updateUserInformation"
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'updateUserInformation'): void;
}>();

const profilUpdated = ref(false);

const updateUserInformation = async () => {
  emit('updateUserInformation');
  profilUpdated.value = true;
  setTimeout(() => {
    profilUpdated.value = false;
  }, 3000);
};
</script>
