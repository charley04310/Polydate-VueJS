<script lang="ts">
import CarouselImageUser from 'src/components/carousel/CarouselImageUser.vue';
import CarouselMobileUser from 'src/components/carousel/CarouselMobileUser.vue';
import MatchUserNavigation from 'src/components/navigation/MatchUserNavigation.vue';
import { ref } from 'vue';
</script>

<template>
  <q-page>
    <q-toolbar
      flat
      class="bg-grey-2 text-secondary shadow-2 q-mb-md"
      style="border-radius: 10px"
    >
      <q-checkbox v-model="selection" :val="2" label="Femme" color="purple-7" />
      <q-checkbox v-model="selection" :val="1" label="Homme" color="pink" />
      <q-checkbox v-model="selection" :val="1" label="Les deux" color="pink" />

      <q-space />
    </q-toolbar>
    <div class="row justify-around">
      <div class="col-md-5 q-pr-lg">
        <CarouselMobileUser />
      </div>

      <q-separator vertical inset color="white" />
      <div class="col-md-5 q-pl-lg">
        <CarouselImageUser />
        <MatchUserNavigation />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
const selection = ref([]);
</script>
