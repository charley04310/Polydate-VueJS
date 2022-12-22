<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({});
</script>
<template>
  <div class="row q-gutter-x-md">
    <q-img
      :src="url"
      spinner-color="red"
      style="height: 200px; max-width: 210px"
    />
    <q-img
      :src="url"
      spinner-color="red"
      style="height: 200px; max-width: 210px"
    />
    <q-img
      :src="url"
      spinner-color="red"
      style="height: 200px; max-width: 210px"
    />
  </div>
</template>
<script setup lang="ts">
const url = ref('https://placeimg.com/500/300/nature');
</script>
