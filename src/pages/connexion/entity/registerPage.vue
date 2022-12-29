<script lang="ts">
import QInputFIrstName from 'src/components/input/QInputFIrstName.vue';
import QInputLastName from 'src/components/input/QInputLastName.vue';
import QInputCity from 'src/components/input/QInputCity.vue';
import QInputMail from 'src/components/input/QInputMail.vue';
import QInputDescription from 'src/components/input/QInputDescription.vue';
import QSelectIciPour from 'src/components/input/QSelectIciPour.vue';
import QInputUniversite from 'src/components/input/QSelectSchool.vue';
import { useUserStore } from 'src/stores/userStore';
</script>

<template>
  <div class="q-gutter-y-md container-register">
    <h1
      v-if="isCreated === undefined"
      class="text-h3 q-ma-none text-center text-white"
    >
      CRÉER UN COMPTE
    </h1>
    <h1 v-else class="text-h6 q-ma-none text-center text-white">
      FÉLICITATION
    </h1>
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
            <q-item>
              <q-item-section avatar>
                <q-icon name="face" color="secondary" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Qui êtes vous ?</q-item-label>
              </q-item-section>
            </q-item>
            <QInputFIrstName v-model="newUser.userFirstname" />
            <QInputLastName v-model="newUser.userLastname" />
            <QInputCity v-model="newUser.userCity" />
          </q-card>
          <q-separator></q-separator>
          <div class="text-black">
            <q-card flat>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="emoji_nature" color="secondary" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Sexe</q-item-label>
                </q-item-section>
              </q-item>
              <q-checkbox
                v-model="selection"
                :val="2"
                label="Femme"
                color="purple-7"
              />
              <q-checkbox
                v-model="selection"
                :val="1"
                label="Homme"
                color="pink"
              />
              <q-checkbox
                v-model="selection"
                :val="3"
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
            :disable="step1Validator"
            color="primary"
            label="CONTINUER"
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
          <q-item>
            <q-item-section avatar>
              <q-icon name="admin_panel_settings" color="secondary" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Informations de connexion</q-item-label>
            </q-item-section>
          </q-item>
          <QInputMail
            :rules="[
              (val: string, rules: any) =>
                isStudentMail(val)
                  ? (emailIsValide = true)
                  : 'Email étudiant non valide : @etu.montpellier.fr',
            ]"
            v-model="newUser.userEmail"
          />
          <q-separator></q-separator>
          <q-item>
            <q-item-section avatar>
              <q-icon name="privacy_tip" color="secondary" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Sécurité</q-item-label>
            </q-item-section>
          </q-item>
          <q-input
            input-style="min-width: 450px"
            class="q-mx-none"
            outlined
            filled
            v-model="newUser.userPassword"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[
              (val: any) =>
                isPasswordValid(val)
                  ? (passWordIsValid = true)
                  : '8 caractères min, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial',
            ]"
            label="Password"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            input-style="min-width: 450px"
            class="q-mx-none"
            outlined
            filled
            v-model="passwordConfirmation"
            label="Password Confirmation"
            lazy-rules
            :rules="[
              (val: any) =>
                isSamePassword(val)
                  ? (confirmationPasswordIsValide = true)
                  : 'Mot de passe non identique',
            ]"
            :type="isPwdConfirm ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwdConfirm = !isPwdConfirm"
              />
            </template>
          </q-input>
        </q-card>
        <q-stepper-navigation>
          <q-btn
            @click="
              () => {
                //done2 = true;
                step = 3;
              }
            "
            :disable="setp2Validator"
            color="primary"
            label="CONTINUER"
          />
          <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="RETOUR"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="" icon="add_comment" :header-nav="step > 3">
        <q-card
          v-if="isCreated"
          flat
          class="text-black q-gutter-y-sm"
          style="min-width: 450px"
        >
          <q-card-section class="q-pa-lg">
            <q-item>
              <q-item-section avatar>
                <q-icon
                  :name="messageError ? 'error' : 'celebration'"
                  :color="messageError ? 'red' : 'green'"
                  size="2em"
                />
              </q-item-section>

              <q-item-section v-if="!messageError">
                <q-item-label>
                  Félicitation votre compte a bien été créé
                </q-item-label>
              </q-item-section>

              <q-item-section v-if="messageError">
                <q-item-label>
                  Il semblerait qu'un problème soit survenu
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn
              class="q-mx-none"
              color="accent"
              text-color="white"
              label="Je commence à dater"
              @click="emit('loginPage')"
            />
          </q-card-actions>
        </q-card>

        <q-card
          v-if="isCreated === undefined"
          flat
          class="text-black q-gutter-y-sm"
        >
          <q-card-section class="q-pa-none">
            <div class="text-subtitle2">Votre université...</div>
          </q-card-section>
          <QInputUniversite v-model="newUser.userSchoolId" class="bg-white" />

          <q-card-section class="q-pa-none">
            <div class="text-subtitle2">Vous êtes ici pour...</div>
          </q-card-section>
          <QSelectIciPour v-model="newUser.userIciPourId" class="bg-white" />

          <q-separator></q-separator>
          <q-card-section class="q-pa-none">
            <div class="text-subtitle2">Description</div>
          </q-card-section>

          <QInputDescription v-model="newUser.userDescription" />
        </q-card>

        <q-stepper-navigation v-if="isCreated === undefined">
          <q-btn
            @click="createNewUser(newUser)"
            :disable="
              newUser.userDescription.length > 0 && newUser.userIciPourId > 0
                ? false
                : true
            "
            :loading="loading"
            color="primary"
            label="Créer mon compte"
          >
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              Loading...
            </template>
          </q-btn>
          <q-btn
            flat
            @click="step = 2"
            color="primary"
            label="RETOUR"
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
import { watch, ref, computed } from 'vue';
import { ICreateOrEditUser } from 'src/stores/authStore';

const loading = ref(false);
const userStore = useUserStore();
const isCreated = ref<boolean | undefined>(undefined);
const messageError = ref(false);

const createNewUser = async (newUser: ICreateOrEditUser) => {
  // we set loading state
  loading.value = true;

  setTimeout(async () => {
    loading.value = false;
    isCreated.value = await userStore.saveUserToDataBase(newUser);
    if (!isCreated.value) {
      messageError.value = true;
    }
  }, 2000);
};

const newUser = ref<ICreateOrEditUser>({
  userFirstname: '',
  userLastname: '',
  userCity: 'Montpellier',
  userSchoolId: 1, // valeur par default Paul Valéry
  userGenreId: 0,
  userEmail: '',
  userPassword: '',
  userIciPourId: '',
  userDescription: '',
});

const passWordIsValid = ref(false);
const emailIsValide = ref(false);
const confirmationPasswordIsValide = ref(false);

const isPwd = ref(true);
const isPwdConfirm = ref(true);
const passwordConfirmation = ref('');
const step = ref(1);
const selection = ref([]);

const emit = defineEmits<{
  (e: 'loginPage'): void;
}>();
watch(selection, (newSelection) => {
  newUser.value.userGenreId = parseInt(selection.value[0]);

  if (newSelection.length > 1) {
    newUser.value.userGenreId = parseInt(newSelection[1]);
    selection.value = [newSelection[1]];
  }
});

const isStudentMail = (val: string) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@etu\.montpellier\.fr$/;
  return regex.test(val);
};

const isPasswordValid = (val: string) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(.{8,})$/;
  return regex.test(val);
};
const isSamePassword = (val: string) => {
  return val === newUser.value.userPassword;
};
const setp2Validator = computed(() => {
  if (
    emailIsValide.value &&
    passWordIsValid.value &&
    passwordConfirmation.value.toString().length > 0 &&
    newUser.value.userPassword === passwordConfirmation.value
  ) {
    return false;
  } else {
    return true;
  }
});
const step1Validator = computed(() => {
  if (
    selection.value.length > 0 &&
    // prenom et nom de plus de 1 lettre
    newUser.value.userFirstname.length > 1 &&
    newUser.value.userLastname.length > 1 &&
    newUser.value.userCity.length > 0
  ) {
    return false;
  } else {
    return true;
  }
});
</script>
<style scoped>
.container-register {
  max-width: 650px;
  height: auto;
}
</style>
