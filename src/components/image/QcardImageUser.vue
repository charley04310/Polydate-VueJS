<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
<template>
  <q-card class="my-card" flat bordered>
    <q-img
      v-bind="$attrs"
      spinner-color="red"
      style="height: 150px; max-width: 210px"
    />
  </q-card>
</template>
<script setup lang="ts"></script>
