<script lang="ts">
import { onBeforeMount } from 'vue';
import { useAuthStore } from './stores/authStore';
</script>

<template>
  <router-view />
</template>

<script setup lang="ts">
onBeforeMount(async () => {
  const authStore = useAuthStore();
  await authStore.tryToConnectWithCookies();
});
</script>
