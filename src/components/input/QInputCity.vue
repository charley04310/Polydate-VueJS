<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<template>
  <div>
    <q-input
      v-bind="$attrs"
      input-style="min-width: 450px"
      class="q-mx-none"
      :disable="true"
      outlined
      filled
      label="Ville universitaire"
    />
  </div>
</template>

<script setup lang="ts"></script>
