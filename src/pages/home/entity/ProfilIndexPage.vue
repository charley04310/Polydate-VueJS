<script lang="ts">
import QImageUser from 'src/components/image/QImageUser.vue';
import QInputFIrstName from 'src/components/input/QInputFIrstName.vue';
import QInputLastName from 'src/components/input/QInputLastName.vue';
import QInputCity from 'src/components/input/QInputCity.vue';
import QInputMail from 'src/components/input/QInputMail.vue';
import QInputPassword from 'src/components/input/QInputPassword.vue';
import QSelectIciPour from 'src/components/input/QSelectIciPour.vue';
import QInputDescription from 'src/components/input/QInputDescription.vue';
import QInputUniversite from 'src/components/input/QInputUniversite.vue';
import DialogConfirmEditUser from 'src/components/dialog/DialogConfirmEditUser.vue';
import { onBeforeMount, ref } from 'vue';
import { useUserStore } from 'src/stores/userStore';

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
          <DialogConfirmEditUser v-model="confirmDialogIsOpen" />
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
      <QInputUniversite :disable="editMyProfil" class="bg-white" />

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
            :val="2"
            label="Femme"
            color="purple-7"
            :disable="editMyProfil"
          />
          <q-checkbox
            v-model="selection"
            :disable="editMyProfil"
            :val="1"
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
        v-mdoel="userProfil.userEmail"
        :disable="editMyProfil"
        class="bg-white"
      />
      <QInputPassword
        v-model="userProfil.userPassword"
        :disable="editMyProfil"
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
const userProfil = ref({
  userFirstname: user?.userFirstname,
  userLastname: user?.userLastname,
  userCity: user?.userCity,
  userGenreId: user?.userGenreId,
  userEmail: user?.userEmail,
  userPassword: user?.userPassword,
  userIciPourId: user?.userIciPourId,
  userDescription: user?.userDescription,
});
onBeforeMount(() => {
  userStore.getUserInformation();
});

const selection = ref([]);

const userEditProfil = () => {
  editMyProfil.value = !editMyProfil.value;
};

/*
watch(selection, (newSelection) => {
  editUser.value.userGenreId = parseInt(selection.value[0]);

  if (newSelection.length > 1) {
    editUser.value.userGenreId = parseInt(newSelection[1]);
    selection.value = [newSelection[1]];
  }
}); */
</script>
