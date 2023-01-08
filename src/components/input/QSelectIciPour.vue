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
      input-style="max-width: 450px"
      :options="options"
      option-value="id"
      option-label="desc"
      emit-value
      map-options
      label="Ici pour.."
    >
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section avatar>
            <q-icon :name="scope.opt.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ scope.opt.desc }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script setup lang="ts">
const options = [
  {
    id: USER_ICI_POUR.AMOUR,
    desc: 'Rencontre amoureuse',
    icon: 'favorite',
  },
  {
    id: USER_ICI_POUR.AMITIE,
    desc: 'Rencontre amicale',
    icon: 'people',
  },
  {
    id: USER_ICI_POUR.RENCONTRE,
    desc: 'Une rencontre sans lendemain',
    icon: 'cruelty_free',
  },
];
</script>
