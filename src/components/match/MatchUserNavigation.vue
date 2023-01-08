<script lang="ts">
import { useUserStore } from 'src/stores/userStore';
import { computed, defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import { usePolydateStore } from 'src/stores/polydateStore';
export default defineComponent({});
</script>
<template>
  <q-card
    style="border-radius: 5px; width: 300px; margin: 1rem auto"
    class="flex justify-around bg-white-1 q-pa-sm"
  >
    <q-btn
      @click="matchWithUser(1)"
      size="20px"
      round
      color="red"
      icon="favorite"
    >
      <q-tooltip>Rencontre Love</q-tooltip>
    </q-btn>
    <q-btn
      @click="matchWithUser(2)"
      size="20px"
      round
      color="blue"
      icon="cruelty_free"
    >
      <q-tooltip>Rencontre sans lendemain</q-tooltip>
    </q-btn>
    <q-btn
      @click="matchWithUser(3)"
      size="20px"
      round
      color="green"
      icon="school"
    >
      <q-tooltip>Rencontre Universitaire</q-tooltip>
    </q-btn>
    <q-separator size="3px" vertical />
    <q-btn
      size="20px"
      @click="getRandomUser"
      text-color="secondary"
      color="white"
      round
      icon="autorenew"
    >
      <q-tooltip>get new user</q-tooltip>
    </q-btn>
  </q-card>
</template>

<script setup lang="ts">
const $q = useQuasar();

const userStore = useUserStore();
const polydateStore = usePolydateStore();

const genreToFetch = computed(() => {
  return userStore.sexualOrientation;
});

const matchWithUser = async (matchType: number) => {
  const match = await polydateStore.likeUser(matchType);
  if (match) {
    $q.notify({
      message: 'Match Correctement envoyé !',
      color: 'green-4',
      textColor: 'white',
      icon: 'check_circle',
      position: 'top',
    });
    getRandomUser();
  } else {
    $q.notify({
      message: "Problème lors de l'envoi du match !",
      color: 'red-4',
      textColor: 'white',
      icon: 'check_circle',
      position: 'top',
    });
  }
};

const getRandomUser = async () => {
  if (genreToFetch.value === undefined) return;
  await polydateStore.getRandomUserBygenre(genreToFetch.value);
};
</script>
