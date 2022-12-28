<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import { computed } from 'vue';

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
  <!--
  <q-item>
    <q-item-section avatar>
      <q-icon color="secondary" name="ramen_dining" />
    </q-item-section>

    <q-item-section>
      <div class="text-h5 q-mb-xs">Soirée...</div>
      <div class="text-grey">Appartement entre amis !</div>
    </q-item-section>
  </q-item> -->

  <q-item>
    <q-item-section avatar>
      <q-icon color="secondary" name="male" />
    </q-item-section>

    <q-item-section>
      <div class="text-h5 q-mb-xs">Description</div>
      <div class="text-grey">{{ user?.userDescription }}</div>
    </q-item-section>
  </q-item>
</template>
<script setup lang="ts">
const userStore = useUserStore();
const user = computed(() => {
  return userStore.userFeed;
});

const userIciPour = computed(() => {
  switch (userStore.userFeed?.userIciPourId) {
    case 1:
      return 'Une rencontre Amoureuse';
    case 2:
      return 'Une rencontre amicale';

    case 3:
      return 'Pour les soirées étudiantes';

    case 4:
      return 'Un peu de tout ça';

    default:
      return 'Ecole maternelle';
  }
});
</script>

<style lang="css"></style>
