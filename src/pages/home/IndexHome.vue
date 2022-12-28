<script lang="ts">
import CarouselImageUser from 'src/components/carousel/CarouselImageUser.vue';
import CarouselMobileUser from 'src/components/carousel/CarouselMobileUser.vue';
import MatchUserNavigation from 'src/components/navigation/MatchUserNavigation.vue';
import { useUserStore } from 'src/stores/userStore';
import { onBeforeMount, ref, watch } from 'vue';
</script>

<template>
  <q-page>
    <q-toolbar
      flat
      class="bg-grey-2 text-secondary shadow-2 q-mb-md"
      style="border-radius: 10px"
    >
      <q-checkbox v-model="selection" :val="1" label="Femme" color="purple-7" />
      <q-checkbox v-model="selection" :val="2" label="Homme" color="pink" />
      <q-checkbox
        v-model="selection"
        :val="3"
        label="Transgenre"
        color="blue-7"
      />

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
onBeforeMount(async () => {
  if (genreToFetch.value === undefined) {
    genreToFetch.value = 1;
  }
  await userStore.getRandomUserBygenre(genreToFetch.value);
});

const userStore = useUserStore();
const genreToFetch = ref(userStore.userGenreToFind);
const selection = ref([genreToFetch.value]);

watch(selection, async (newSelection) => {
  if (newSelection.length > 0) {
    let value = newSelection[0];
    if (typeof value === 'string') {
      genreToFetch.value = parseInt(value);
    } else {
      genreToFetch.value = value;
    }
  }
  if (newSelection.length > 1) {
    let value = newSelection[1];
    if (typeof value === 'string') {
      genreToFetch.value = parseInt(value);
      selection.value = [value];
    } else {
      genreToFetch.value = value;
      selection.value = [value];
    }
  }
  if (genreToFetch.value) {
    userStore.userGenreToFind = genreToFetch.value;
    await userStore.getRandomUserBygenre(genreToFetch.value);
  }
});
</script>
