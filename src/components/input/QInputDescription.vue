<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<template>
  <div>
    <q-input
      v-bind="$attrs"
      filled
      input-style="max-width: 450px; min-width: 350px"
      outlined
      type="textarea"
    />
  </div>
</template>

<script setup lang="ts"></script>
