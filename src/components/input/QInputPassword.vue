<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<template>
  <div>
    <q-input
      v-bind="$attrs"
      ref="email"
      input-style="min-width: 450px"
      class="q-mx-none"
      type="password"
      label="Mot de passe"
    />
  </div>
</template>

<script setup lang="ts"></script>
