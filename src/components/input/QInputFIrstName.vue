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
      filled
      label="Nom"
    />
  </div>
</template>

<script setup lang="ts"></script>
