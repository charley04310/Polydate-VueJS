<script lang="ts">
import { SCHOOL } from 'src/enums/emunsUser';
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<template>
  <div>
    <q-select
      v-bind="$attrs"
      outlined
      filled
      input-style="max-width: 450px; min-width: 350px"
      :options="options"
      option-value="id"
      option-label="desc"
      emit-value
      map-options
      label="Votre université"
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
    id: SCHOOL.PAUL_VALÉRY,
    desc: 'Université Paul Valéry',
    icon: 'favorite',
  },
  {
    id: SCHOOL.FAC_SCIENCE,
    desc: 'Université des sciences',
    icon: 'school',
  },
  {
    id: SCHOOL.FAC_MEDCINE,
    desc: 'Université de médecine',
    icon: 'school',
  },
];
</script>
