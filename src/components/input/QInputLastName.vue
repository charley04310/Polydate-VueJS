<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<template>
  <div>
    <q-input
      v-bind="$attrs"
      ref="prenom"
      input-style="min-width: 450px"
      class="q-mx-none"
      filled
      label="Prénom"
    />
  </div>
</template>

<script setup lang="ts"></script>
