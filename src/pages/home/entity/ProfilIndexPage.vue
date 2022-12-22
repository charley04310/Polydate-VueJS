<script lang="ts">
import QImageUser from 'src/components/image/QImageUser.vue';
import QInputFIrstName from 'src/components/input/QInputFIrstName.vue';
import QInputLastName from 'src/components/input/QInputLastName.vue';
import QInputCity from 'src/components/input/QInputCity.vue';
import QInputMail from 'src/components/input/QInputMail.vue';
import QInputPassword from 'src/components/input/QInputPassword.vue';
import QSelectIciPour from 'src/components/input/QSelectIciPour.vue';
import QInputDescription from 'src/components/input/QInputDescription.vue';
import QInputUniversite from 'src/components/input/QSelectSchool.vue';
import DialogConfirmEditUser from 'src/components/dialog/DialogConfirmEditUser.vue';
import { onBeforeMount, ref, watch } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import { ICreateOrEditUser } from 'src/stores/authStore';

/* import { onBeforeMount, ref, watch } from 'vue';
import { useAuthStore } from 'src/stores/authStore'; */
</script>
<template>
  <h1 class="text-h4 text-white text-bold">
    BIENVENU {{ user?.userFirstname }}
  </h1>

  <div class="row justify-between q-mt-lg">
    <q-card flat square class="col-6 q-pa-lg q-gutter-y-md">
      <div class="row justify-between">
        <q-item>
          <q-item-section avatar>
            <q-icon name="face" color="secondary" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Vos informations personnelles</q-item-label>
          </q-item-section>
        </q-item>
        <div>
          <q-btn
            color="primary"
            @click="userEditProfil"
            :label="editMyProfil ? 'Modifier mes informations' : 'Annuler'"
          />
          <q-btn
            color="green"
            class="q-ml-md"
            v-if="!editMyProfil"
            @click="confirmDialogIsOpen = true"
            label="Valider"
          />
          <DialogConfirmEditUser
            @updateUserInformation="updateUserInformation"
            v-model="confirmDialogIsOpen"
          />
        </div>
      </div>

      <QInputFIrstName
        :disable="editMyProfil"
        v-model="userProfil.userFirstname"
        class="bg-white"
      />
      <QInputLastName
        :disable="editMyProfil"
        v-model="userProfil.userLastname"
        class="bg-white"
      />
      <QInputCity
        :disable="editMyProfil"
        v-model="userProfil.userCity"
        class="bg-white"
      />
      <QInputUniversite
        v-model="userProfil.userSchoolId"
        :disable="editMyProfil"
        class="bg-white"
      />

      <div class="text-black q-gutter-y-md">
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
            :val="1"
            label="Femme"
            color="purple-7"
            :disable="editMyProfil"
          />
          <q-checkbox
            v-model="selection"
            :disable="editMyProfil"
            :val="2"
            label="Homme"
            color="pink"
          />
          <q-checkbox
            v-model="selection"
            :val="3"
            label="Transgenre"
            color="cyan"
            :disable="editMyProfil"
          />
        </q-card>
      </div>
    </q-card>
    <q-card flat square class="col-6 q-pa-lg q-gutter-y-md">
      <q-item>
        <q-item-section avatar>
          <q-icon name="face" color="secondary" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Vous êtes ici pour...</q-item-label>
        </q-item-section>
      </q-item>
      <QSelectIciPour
        :disable="editMyProfil"
        v-model="userProfil.userIciPourId"
        class="bg-white"
      />
      <QInputDescription
        :disable="editMyProfil"
        v-model="userProfil.userDescription"
        class="bg-white"
      />
      <q-item>
        <q-item-section avatar>
          <q-icon name="lock" color="secondary" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Sécurité</q-item-label>
        </q-item-section>
      </q-item>

      <QInputMail
        v-model="userProfil.userEmail"
        :disable="true"
        class="bg-white"
      />
      <QInputPassword
        v-model="userProfil.userPassword"
        :disable="true"
        class="bg-white"
      />
    </q-card>
    <q-card flat square class="col-12 q-pa-lg q-gutter-y-md">
      <q-separator color="secondary" size="3px" />
      <q-item>
        <q-item-section avatar>
          <q-icon name="image" color="secondary" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Vos images</q-item-label>
        </q-item-section>
      </q-item>
      <QImageUser />
    </q-card>
  </div>
</template>
<script setup lang="ts">
const confirmDialogIsOpen = ref(false);
//const authStore = useAuthStore();
const editMyProfil = ref(true);
const userStore = useUserStore();
const user = userStore.connectedUser;

const userProfil = ref<ICreateOrEditUser>({
  userFirstname: '',
  userLastname: '',
  userCity: 'Montpellier',
  userGenreId: user?.userGenreId || 1,
  userSchoolId: '',
  userEmail: '',
  userPassword: '',
  userIciPourId: '',
  userDescription: '',
});

onBeforeMount(() => {
  userStore.getUserInformation();
});

const updateUserInformation = async () => {
  if (!userProfil.value) return;
  const isUpdated = await userStore.updateUserInformation(userProfil.value);
  if (isUpdated != undefined) {
    userStore.getUserInformation();
  }
  console.log(userProfil.value);
};

const selection = ref([userProfil.value.userGenreId]);

const userEditProfil = () => {
  editMyProfil.value = !editMyProfil.value;
};

watch(userStore, (store) => {
  if (store.connectedUser != undefined) {
    let user = store.connectedUser;
    userProfil.value.userFirstname = user?.userFirstname;
    userProfil.value.userLastname = user?.userLastname;
    userProfil.value.userCity = user?.userCity;
    userProfil.value.userSchoolId = user?.userSchoolId;
    selection.value = [user?.userGenreId];
    userProfil.value.userEmail = user?.userEmail;
    userProfil.value.userPassword = user?.userPassword;
    userProfil.value.userIciPourId = user?.userIciPourId;
    userProfil.value.userDescription = user?.userDescription;
  }
});

watch(selection, (newSelection) => {
  userProfil.value.userGenreId = selection.value[0];

  if (newSelection.length > 1) {
    userProfil.value.userGenreId = newSelection[1];
    selection.value = [newSelection[1]];
  }
});
</script>
