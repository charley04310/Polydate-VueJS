<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<template>
  <div>
    <q-input
      v-bind="$attrs"
      input-style="max-width: 450px; min-width: 350px"
      class="q-mx-none"
      filled
      label="Nom"
    />
  </div>
</template>

<script setup lang="ts"></script>
