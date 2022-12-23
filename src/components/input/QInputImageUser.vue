<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
<template>
  <div class="row q-gutter-x-md">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section>
          <q-file
            v-bind="$attrs"
            color="white"
            outlined
            label="ajouter une image"
            :input-style="{
              height: '30px',
            }"
          >
            <template v-slot:prepend>
              <q-icon class="q-pl-xs" name="add_a_photo" />
            </template>

            >
          </q-file>
        </q-card-section>

        <q-btn flat color="red" icon="add">
          <q-tooltip>Ajouter une image</q-tooltip>
        </q-btn>
        <q-btn flat color="teal" icon="delete">
          <q-tooltip>Annuler l'image</q-tooltip>
        </q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts"></script>
