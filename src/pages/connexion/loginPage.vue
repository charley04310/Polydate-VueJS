<template>
  <div class="q-gutter-y-md">
    <h1 class="text-h3 q-ma-none text-white text-center">SE CONNECTER</h1>
    <q-input
      input-style="min-width: 450px"
      class="q-mx-none"
      bg-color="white"
      outlined
      v-model="text"
      label="Adresse email"
    />
    <q-input
      input-style="min-width: 450px"
      class="q-mx-none"
      bg-color="white"
      outlined
      v-model="text"
      label="Mot de passe"
    />
    <div class="column q-gutter-y-md text-secondary">
      <q-btn class="q-mx-none" color="primary" label="SE CONNECTER" />
      <q-btn
        class="q-mx-none"
        color="accent"
        text-color="white"
        label="Créer un compte"
        @click="emit('registerPage')"
      />
      <q-btn flat text-color="white" label="Mot de passe oublié" />
    </div>
  </div>
</template>

<script setup lang="ts">
//import { Todo } from 'src/components/models';
import { ref } from 'vue';
const emit = defineEmits<{
  (e: 'registerPage'): void;
}>();

const text = ref('Hello World');

//interface Props {}
//const props = withDefaults(defineProps<Props>(), {});

/* const clickCount = ref(0);
function increment() {
  clickCount.value += 1;
  return clickCount.value;
}
 */
// const todoCount = computed(() => props.todos.length);
</script>
