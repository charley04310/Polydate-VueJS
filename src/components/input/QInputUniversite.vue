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
      label="Votre université"
    />
  </div>
</template>

<script setup lang="ts">
const options = [
  {
    id: USER_ICI_POUR.AMOUR,
    desc: 'Université des sciences humaines',
  },
  {
    id: USER_ICI_POUR.AMITIE,
    desc: 'Université des sciences de la nature',
  },
  {
    id: USER_ICI_POUR.RENCONTRE,
    desc: 'Université des sciences de la vie',
  },
];
</script>
