<script lang="ts">
import { USER_ICI_POUR } from 'src/enums/emunsUser';
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<template>
  <div>
    <q-select
      v-bind="$attrs"
      outlined
      filled
      input-style="min-width: 450px"
      :options="options"
      option-value="id"
      option-label="desc"
      emit-value
      map-options
      label="Ici pour.."
    />
  </div>
</template>

<script setup lang="ts">
const options = [
  {
    id: USER_ICI_POUR.AMOUR,
    desc: 'Rencontre amoureuse',
  },
  {
    id: USER_ICI_POUR.AMITIE,
    desc: 'Rencontre amicale',
  },
  {
    id: USER_ICI_POUR.RENCONTRE,
    desc: 'Rencontre amicale',
  },
];
</script>
