<script lang="ts">
import { onBeforeMount } from 'vue';
import { useAuthStore } from './stores/authStore';
</script>

<template>
  <router-view />
</template>

<script setup lang="ts">
const authStore = useAuthStore();
onBeforeMount(async () => {
  await authStore.tryToConnectWithCookies();
});
</script>
