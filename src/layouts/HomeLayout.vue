<template>
  <div class="q-pl-md q-pr-md">
    <q-layout view="lHh Lpr lFf">
      <q-header class="bg-secondary">
        <q-toolbar>
          <q-img
            class="q-mt-md"
            src="../assets/polytech.png"
            spinner-color="white"
            style="max-width: 200px"
          />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-if="$q.screen.gt.sm"
        v-model="drawer"
        show-if-above
        :mini="miniState"
        :width="350"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
          <q-list padding>
            <q-item v-ripple>
              <q-btn
                flat
                @click="miniState = !miniState"
                round
                dense
                size="1.5em"
                icon="menu"
              />
            </q-item>
            <q-item clickable to="/profil">
              <q-item-section avatar>
                <q-avatar>
                  <img
                    v-if="userImage !== undefined"
                    :src="`https://cluster-2022-5.dopolytech.fr/api/images/user/${userImage[0].imageLink}`"
                  />

                  <img v-else src="https://cdn.quasar.dev/img/avatar.png" />
                </q-avatar>
              </q-item-section>

              <q-item-section class="text-weight-bolder">
                {{ userName }}
              </q-item-section>
            </q-item>

            <q-item clickable to="/polydate">
              <q-item-section avatar>
                <q-icon name="volunteer_activism" color="secondary" />
              </q-item-section>

              <q-item-section class="text-weight-bolder">
                POLY-DATE</q-item-section
              >
            </q-item>

            <q-item clickable to="/matches">
              <q-item-section avatar>
                <q-icon name="deck" color="secondary" />
              </q-item-section>

              <q-item-section class="text-weight-bolder">
                POLY-MATCHS</q-item-section
              >
            </q-item>

            <q-item clickable v-if="userRoleId === 2" to="/users/control">
              <q-item-section avatar>
                <q-icon name="supervisor_account" color="secondary" />
              </q-item-section>

              <q-item-section class="text-weight-bolder">
                TOUS LES UTILISATEURS</q-item-section
              >
            </q-item>

            <q-item @click="confirm = true" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>

              <q-item-section class="text-weight-bolder">
                SE DÉCONNECTER
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
        <DialogConfirmLogOut v-model="confirm" />
      </q-drawer>

      <q-footer v-else reveal-offset class="bg-white">
        <q-tabs v-model="tab" class="text-secondary" align="justify">
          <q-route-tab
            v-for="(nav, index) in navs"
            :key="index"
            :to="nav.path"
            exact
            :icon="nav.icon"
            class="q-pa-md"
          />
          <q-route-tab
            @click="confirm = true"
            exact
            icon="logout"
            class="q-pa-md"
          />
        </q-tabs>
        <DialogConfirmLogOut v-model="confirm" />
      </q-footer>
      <q-page-container class="window-height">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import DialogConfirmLogOut from 'src/components/navigation/DialogConfirmLogOut.vue';
import { useUserStore } from 'src/stores/userStore';
import { computed, onBeforeMount, ref } from 'vue';
const $q = useQuasar();

const navs = ref([
  {
    title: 'Profil',
    icon: 'person',
    path: '/profil',
  },
  {
    title: 'Poly-date',
    icon: 'volunteer_activism',
    path: '/polydate',
  },
  {
    title: 'Poly-Matchs',
    icon: 'deck',
    path: '/matches',
  },
]);

const tab = ref('');
const userStore = useUserStore();

onBeforeMount(async () => {
  await userStore.getUserInformationWithCookie();
});
const userImage = computed(() => {
  return userStore.userImages;
});
const userName = computed(() => {
  return userStore.connectedUser?.userFirstname;
});
const userRoleId = computed(() => {
  return userStore.connectedUser?.userRoleId;
});
const confirm = ref(false);
/* const authStore = useAuthStore(); */
const drawer = ref(false);
const miniState = ref(true);
</script>
