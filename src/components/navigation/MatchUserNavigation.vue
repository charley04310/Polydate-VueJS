<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
<template>
  <div class="flex justify-around items-center q-mt-lg">
    <q-btn size="20px" round text-color="secondary" color="white" icon="west">
      <q-tooltip>Dater dans un parc</q-tooltip>
    </q-btn>
    <q-card
      style="border-radius: 20px; width: 300px; margin: 1rem auto"
      class="flex justify-around bg-blue-1 q-pa-sm"
    >
      <q-btn size="20px" round color="red" icon="favorite">
        <q-tooltip>Dater dans un parc</q-tooltip>
      </q-btn>
      <q-btn size="20px" round color="blue" icon="school">
        <q-tooltip>Réviser</q-tooltip>
      </q-btn>
      <q-btn size="20px" round color="green" icon="local_bar">
        <q-tooltip>Boire un verre</q-tooltip>
      </q-btn>
    </q-card>
    <q-btn size="20px" round text-color="secondary" color="white" icon="east">
      <q-tooltip>Dater dans un parc</q-tooltip>
    </q-btn>
  </div>
</template>

<script setup lang="ts"></script>
