<script lang="ts">
import QcardImageUser from 'src/components/image/QcardImageUser.vue';
import QInputFIrstName from 'src/components/input/QInputFIrstName.vue';
import QInputLastName from 'src/components/input/QInputLastName.vue';
import QInputCity from 'src/components/input/QInputCity.vue';
import QSelectIciPour from 'src/components/input/QSelectIciPour.vue';
import QInputDescription from 'src/components/input/QInputDescription.vue';
import QInputUniversite from 'src/components/input/QSelectSchool.vue';
import DialogConfirmEditUser from 'src/components/dialog/DialogConfirmEditUser.vue';
import DialogDeleteImage from 'src/components/dialog/DialogConfirmDeleteImage.vue';

import { computed, ref, watch } from 'vue';
import { useUserStore } from 'src/stores/userStore';
</script>
<template>
  <h1 class="text-h4 text-white text-bold">
    BIENVENU {{ userStore.connectedUser?.userFirstname }}
  </h1>

  <div v-if="userProfil" class="row justify-between q-mt-lg">
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
            cursor="pointer"
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
        :disable="true"
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
      <!--       <q-item>
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
      /> -->
    </q-card>

    <q-card flat square class="col-12 q-pa-lg q-gutter-y-md">
      <q-item>
        <q-item-section avatar>
          <q-icon name="image" color="secondary" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Vos images</q-item-label>
          <q-item-label v-if="succesImageUploaded" style="color: green"
            >Image ajoutée avec succès !</q-item-label
          >
          <q-item-label v-if="errorImageUploaded" style="color: red"
            >Taille de l'image est trop grande!</q-item-label
          >
        </q-item-section>
      </q-item>

      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section>
            <q-file
              v-model="image"
              color="white"
              outlined
              filled
              label="ajouter une image"
              accept=".jpg, .png, image/*"
              @update:model-value="uploadImageCard"
              :input-style="{
                width: '120px',
                height: '20px',
              }"
            >
              <template v-slot:prepend>
                <q-icon class="q-pl-xs" name="add_a_photo" />
              </template>

              >
            </q-file>
          </q-card-section>

          <q-btn
            @click="addUserImage"
            :disable="image == null"
            text-color="primary"
            flat
            square
            icon="add"
          >
            <q-tooltip>Enregistrer</q-tooltip>
          </q-btn>
          <q-btn
            @click="deleteImageBeforeUplaoad()"
            :disable="image == null"
            square
            flat
            icon="delete"
          >
            <q-tooltip>Annuler l'image</q-tooltip>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-card>
    <q-card flat square class="col-12 q-pa-lg q-gutter-y-md">
      <slot v-if="userImage != undefined">
        <div class="row justify-start q-mt-lg q-gutter-x-sm">
          <QcardImageUser
            v-for="image in userImage"
            @openDialogdeleteUserImage="
              openDialogDeleteImage(
                `http://localhost:8090/api/images/user/${image.imageLink}`
              )
            "
            @AddAsProfilImage="addOrUpdateProfilImage()"
            class="col-2"
            :key="image.imageId"
            :src="`http://localhost:8090/api/images/user/${image.imageLink}`"
          />

          <DialogDeleteImage
            @deleteUserImage="deleteUserImage(imgToDelete)"
            v-model="dialogDeleteImageIsOpen"
            :src="imgToDelete"
          />
        </div>
      </slot>
    </q-card>
  </div>
</template>
<script setup lang="ts">
const confirmDialogIsOpen = ref(false);
const succesImageUploaded = ref(false);
const dialogDeleteImageIsOpen = ref(false);
//const authStore = useAuthStore();
const editMyProfil = ref(true);
const userStore = useUserStore();
const errorImageUploaded = ref(false);
const image = ref(null);
const imageUrl = ref('');

const imgToDelete = ref('');

const updateUserProfil = async () => {
  userStore.getUserInformationWithCookie();
  //  userStore.getUserImage();
};

const deleteUserImage = async (imageLink: string) => {
  await userStore.deleteUserImage(imageLink);

  updateUserProfil();
};

const addOrUpdateProfilImage = async () => {
  await userStore.addOrUpdateProfileImage();
  updateUserProfil();
};

const openDialogDeleteImage = (imageLink: string) => {
  dialogDeleteImageIsOpen.value = true;
  imgToDelete.value = imageLink;
};
const deleteImageBeforeUplaoad = () => {
  image.value = null;
};
const uploadImageCard = () => {
  console.log(image.value);
  if (image.value) {
    imageUrl.value = URL.createObjectURL(image.value);
  }
};
const addUserImage = async () => {
  if (!image.value) return;
  await userStore.addUserImage(image.value);
  image.value = null;
  succesImageUploaded.value = true;
  setTimeout(() => {
    succesImageUploaded.value = false;
  }, 2000);

  updateUserProfil();
};
const userImage = computed(() => {
  return userStore.userImages;
});

const userProfil = computed(() => {
  return userStore.connectedUser;
});

const updateUserInformation = async () => {
  if (!userProfil.value) return;
  await userStore.updateUserInformation(userProfil.value);
};

const selection = ref([userProfil.value?.userGenreId]);

const userEditProfil = () => {
  editMyProfil.value = !editMyProfil.value;
};

watch(userStore, (store) => {
  if (store.connectedUser != undefined) {
    selection.value = [store.connectedUser?.userGenreId];
  }
});

watch(selection, (newSelection) => {
  if (
    userProfil.value?.userGenreId != undefined &&
    selection.value[0] != undefined
  ) {
    userProfil.value.userGenreId = selection.value[0];
  }

  if (newSelection.length > 1) {
    if (
      userProfil.value?.userGenreId != undefined &&
      newSelection[1] != undefined
    ) {
      userProfil.value.userGenreId = newSelection[1];
      selection.value = [newSelection[1]];
    }
  }
});
</script>
