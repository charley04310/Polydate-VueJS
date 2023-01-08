<script lang="ts">
import { defineComponent } from 'vue';
import { computed } from 'vue';
import { usePolydateStore } from 'src/stores/polydateStore';

export default defineComponent({});
</script>

<template>
  <q-item>
    <q-item-section avatar>
      <q-icon color="secondary" name="favorite" />
    </q-item-section>

    <q-item-section>
      <div class="text-h5 q-mb-xs">Ici pour..</div>
      <div class="text-grey">{{ userIciPour }}</div>
    </q-item-section>
  </q-item>

  <q-item>
    <q-item-section avatar>
      <q-icon color="secondary" :name="userGenre" />
    </q-item-section>

    <q-item-section>
      <div class="text-h5 q-mb-xs">Description</div>
      <div class="text-grey">{{ user?.userDescription }}</div>
    </q-item-section>
  </q-item>
</template>
<script setup lang="ts">
const polydateStore = usePolydateStore();
const user = computed(() => {
  return polydateStore.userFeed;
});

const userIciPour = computed(() => {
  switch (polydateStore.userFeed?.userIciPourId) {
    case 1:
      return 'Une rencontre Amoureuse';
    case 2:
      return 'Une rencontre amicale';

    case 3:
      return 'Pour les soirées étudiantes';

    case 4:
      return 'Un peu de tout ça';

    default:
      return 'Une rencontre Amoureuse';
  }
});

const userGenre = computed(() => {
  switch (polydateStore.userFeed?.userGenreId) {
    case 1:
      return 'female';
    case 2:
      return 'male';
    case 3:
      return 'transgender';
    default:
      return 'Male';
  }
});
</script>

<style lang="css"></style>
