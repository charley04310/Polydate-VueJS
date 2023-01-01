<script lang="ts">
import { usePolydateStore } from 'src/stores/polydateStore';
import { useUserStore } from 'src/stores/userStore';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
  <q-toolbar flat class="bg-grey-2 text-secondary shadow-2 q-mb-md">
    <q-checkbox v-model="selection" :val="1" label="Femme" color="purple-7" />
    <q-checkbox v-model="selection" :val="2" label="Homme" color="pink" />
    <q-checkbox
      v-model="selection"
      :val="3"
      label="Transgenre"
      color="blue-7"
    />
  </q-toolbar>
</template>

<script lang="ts" setup>
const polydateStore = usePolydateStore();
const userStore = useUserStore();
const genreFromStore = computed(() => {
  return userStore.sexualOrientation;
});

const genreToFetch = ref<number>();
const selection = ref([genreFromStore.value]);

onBeforeMount(async () => {
  await userStore.getUserInformationWithCookie();
  if (userStore.sexualOrientation) {
    selection.value = [userStore.sexualOrientation];
  }
});
// fonction de fetch par genre
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
    userStore.sexualOrientation = genreToFetch.value;
    await polydateStore.getRandomUserBygenre(genreToFetch.value);
  }
});
</script>
