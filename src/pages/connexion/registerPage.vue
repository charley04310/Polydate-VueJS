<template>
  <div class="q-gutter-y-md container-register">
    <h1 class="text-h3 q-ma-none text-center text-white">CRÉER UN COMPTE</h1>

    <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated>
      <q-step
        :name="1"
        title=""
        icon="settings"
        :done="step > 1"
        :header-nav="step > 1"
      >
        <div class="q-gutter-y-md">
          <q-card flat class="text-black q-gutter-y-sm">
            <q-card-section class="q-pt-none">
              <div class="text-subtitle2">Qui êtes vous ?</div>
            </q-card-section>
            <q-input
              input-style="min-width: 450px"
              class="q-mx-none"
              filled
              v-model="text"
              label="Nom"
            />
            <q-input
              input-style="min-width: 450px"
              class="q-mx-none"
              outlined
              filled
              v-model="text"
              label="Prénom"
            />
            <q-input
              input-style="min-width: 450px"
              class="q-mx-none"
              :disable="true"
              outlined
              filled
              v-model="ville"
              label="Ville universitaire"
            >
              >
            </q-input>
          </q-card>
          <q-separator></q-separator>
          <div class="text-black">
            <q-card flat>
              <q-card-section class="q-pa-none">
                <div class="text-subtitle2">Sexe</div>
              </q-card-section>
              <q-checkbox
                v-model="selection"
                val="Femme"
                label="Femme"
                color="purple-7"
              />
              <q-checkbox
                v-model="selection"
                val="Homme"
                label="Homme"
                color="pink"
              />
              <q-checkbox
                v-model="selection"
                val="Transgenre"
                label="Transgenre"
                color="cyan"
              />
            </q-card>
          </div>
        </div>

        <q-stepper-navigation>
          <q-btn
            @click="
              () => {
                //done1 = true;
                step = 2;
              }
            "
            color="primary"
            label="Continue"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title=""
        icon="create_new_folder"
        :done="step > 2"
        :header-nav="step > 2"
      >
        <q-card flat class="text-black q-gutter-y-sm">
          <q-card-section class="q-pt-none">
            <div class="text-subtitle2">Information de connexion</div>
          </q-card-section>
          <q-input
            input-style="min-width: 450px"
            class="q-mx-none"
            outlined
            filled
            v-model="text"
            label="Votre adresse email"
          />
          <q-separator></q-separator>

          <q-input
            input-style="min-width: 450px"
            class="q-mx-none"
            outlined
            filled
            v-model="text"
            label="Password"
          />
          <q-input
            input-style="min-width: 450px"
            class="q-mx-none"
            outlined
            filled
            v-model="text"
            label="Password Confirmation"
          />
        </q-card>
        <q-stepper-navigation>
          <q-btn
            @click="
              () => {
                //done2 = true;
                step = 3;
              }
            "
            color="primary"
            label="Continue"
          />
          <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="" icon="add_comment" :header-nav="step > 3">
        <q-card flat class="text-black q-gutter-y-sm">
          <q-card-section class="q-pa-none">
            <div class="text-subtitle2">Vous êtes ici pour...</div>
          </q-card-section>
          <q-select
            outlined
            filled
            input-style="min-width: 450px"
            v-model="iciPour"
            :options="options"
            label="Ici pour.."
          />
          <q-separator></q-separator>
          <q-card-section class="q-pa-none">
            <div class="text-subtitle2">Description</div>
          </q-card-section>

          <q-input
            filled
            input-style="min-width: 450px"
            v-model="text"
            outlined
            type="textarea"
          />
        </q-card>

        <q-stepper-navigation>
          <q-btn color="primary" label="Flirter" />
          <q-btn
            flat
            @click="step = 2"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>

    <div class="column q-gutter-y-md text-secondary">
      <q-btn
        class="q-mx-none"
        color="accent"
        text-color="white"
        label="J'ai déja un compte"
        @click="emit('loginPage')"
      />
      <q-btn flat text-color="white" label="Mot de passe oublié" />
    </div>
  </div>
</template>

<script setup lang="ts">
//import { Todo } from 'src/components/models';
import { watch, ref } from 'vue';
const step = ref(1);
const ville = ref('Montpellier');
const selection = ref([]);
const iciPour = ref('');
const options = [
  'Une rencontre Amoureuse',
  'Une rencontre amicale',
  'Une rencontre professionnelle',
];
const emit = defineEmits<{
  (e: 'loginPage'): void;
}>();

watch(selection, (newSelection) => {
  if (newSelection.length > 1) {
    selection.value = [newSelection[1]];
  }
});
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
<style scoped>
.container-register {
  max-width: 650px;
  height: auto;
}
</style>
