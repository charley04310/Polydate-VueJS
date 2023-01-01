<script lang="ts"></script>

<template>
  <div class="q-pa-none absolute-bottom-right q-ml-lg">
    <q-input bottom-slots filled v-model="text" bg-color="white" label="Label">
      <template v-slot:after>
        <q-btn round dense flat color="primary" icon="send" />
      </template>
    </q-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const text = ref('');
</script>
