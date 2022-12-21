<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useAuthStore } from './stores/authStore';

onBeforeMount(() => {
  const authStore = useAuthStore();
  authStore.tryToConnectWithCookies();
});
</script>
