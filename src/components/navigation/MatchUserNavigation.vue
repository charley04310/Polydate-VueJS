<script lang="ts">
import { useUserStore } from 'src/stores/userStore';
import { computed, defineComponent } from 'vue';
export default defineComponent({});
</script>
<template>
  <q-card
    style="border-radius: 20px; width: 300px; margin: 1rem auto"
    class="flex justify-around bg-blue-1 q-pa-sm"
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
      icon="school"
    >
      <q-tooltip>Rencontre amicale</q-tooltip>
    </q-btn>
    <q-btn
      @click="matchWithUser(3)"
      size="20px"
      round
      color="green"
      icon="local_bar"
    >
      <q-tooltip>Boire un verre</q-tooltip>
    </q-btn>
  </q-card>
  <div class="flex justify-center">
    <q-btn
      size="20px"
      @click="getRandomUser"
      text-color="secondary"
      color="white"
      rounded
      label="Nouveau profil"
    >
      <q-tooltip>get new user</q-tooltip>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
const $q = useQuasar();

const userStore = useUserStore();
const genreToFetch = computed(() => {
  return userStore.userGenreToFind;
});

const matchWithUser = async (matchType: number) => {
  const match = await userStore.likeUser(matchType);
  if (match) {
    $q.notify({
      message: 'Match Correctement envoyé !',
      color: 'green-4',
      textColor: 'white',
      icon: 'check_circle',
      position: 'top',
    });
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

const getRandomUser = () => {
  if (genreToFetch.value === undefined) return;
  userStore.getRandomUserBygenre(genreToFetch.value);
};
</script>
