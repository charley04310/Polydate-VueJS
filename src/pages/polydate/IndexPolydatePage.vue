<script lang="ts">
import CarouselImageUser from 'src/components/carousel/CarouselImageUser.vue';
import CarouselMobileUser from 'src/components/carousel/CarouselMobileUser.vue';
import MatchUserNavigation from 'src/components/match/MatchUserNavigation.vue';
import { useUserStore } from 'src/stores/userStore';
import { computed, onBeforeMount, ref } from 'vue';
import QCheckBoxSelectUserGenreVue from 'src/components/filter/QCheckBoxSelectUserGenre.vue';
</script>

<template>
  <QCheckBoxSelectUserGenreVue />

  <div class="row justify-between">
    <div class="col-md-6 col-sm-12 col-xs-12 q-pr-sm">
      <CarouselMobileUser />
    </div>

    <div class="col-md-6 col-sm-12 col-xs-12 q-pl-sm">
      <CarouselImageUser />
      <MatchUserNavigation />
    </div>
  </div>
</template>

<script lang="ts" setup>
const userStore = useUserStore();
const genreFromStore = computed(() => {
  return userStore.sexualOrientation;
});

const selection = ref([genreFromStore.value]);

onBeforeMount(async () => {
  if (userStore.sexualOrientation) {
    selection.value = [userStore.sexualOrientation];
  }
});
</script>
