<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({});
</script>
<template>
  <q-card
    class="my-card my-image-card"
    @click="editDialog = true"
    cursor="pointer"
    flat
    bordered
  >
    <div
      v-ripple
      @click="editDialog = true"
      class="cursor-pointer relative-position"
    >
      <q-img :ratio="4 / 3" v-bind="$attrs" spinner-color="red" />
    </div>
  </q-card>
</template>
<script setup lang="ts">
const editDialog = ref(false);
</script>

<style lang="css">
.my-image-card:hover {
  border: 2px solid #fe3333;
}
</style>
