<script lang="ts">
import { getRelativeTime } from 'src/utils/date/composable';
import { useAuthStore } from 'src/stores/authStore';
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <slot v-if="matches !== undefined">
      <q-banner
        v-for="(match, index) in matches"
        :key="index"
        inline-actions
        rounded
        :class="`${getColorBanner(match.matchStatId)} text-white`"
      >
        <q-avatar rounded>
          <img
            v-if="match.matchDstId.userImage != undefined"
            :src="`http://localhost:8090/images/user/${match.matchDstId.userImage[0].imageLink}`"
          />
        </q-avatar>

        <span
          v-if="match.matchSrcId.userId === userId"
          class="q-pl-md text-uppercase text-subtitle1 text-weight-bold"
        >
          {{ match.matchDstId.userFirstname }}
          {{ match.matchDstId.userLastname }}
        </span>
        <span
          v-else
          class="q-pl-md text-uppercase text-subtitle1 text-weight-bold"
        >
          {{ match.matchSrcId.userFirstname }}
          {{ match.matchSrcId.userLastname }}
        </span>
        <q-separator vertical color="white" size="1px" />

        <template v-slot:action>
          <slot v-if="match.matchStatId === MATCH_STATE.VALIDE">
            <q-btn flat icon="message" label="Discuter" />
          </slot>
          <slot v-else>
            <q-btn
              flat
              icon="favorite"
              @click="
                validateMatchOrRefused(
                  match.matchSrcId.userId,
                  MATCH_STATE.VALIDE
                )
              "
              label="Matcher"
            />
            <q-btn
              @click="
                validateMatchOrRefused(
                  match.matchSrcId.userId,
                  MATCH_STATE.REFUSER
                )
              "
              flat
              icon="cancel"
              label="Refuser"
            />
          </slot>

          <q-separator vertical color="white" size="1px" />
          <span class="q-pl-md"> {{ getRelativeTime(match.matchDate) }}</span>
        </template>
      </q-banner>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { MATCH_STATE } from 'src/enums/emunsUser';
import { usePolydateStore } from 'src/stores/polydateStore';
import { computed, onBeforeMount } from 'vue';
const polydateStore = usePolydateStore();
const authStore = useAuthStore();

const userId = computed(() => {
  return authStore.cookieUser?.userId;
});

onBeforeMount(async () => {
  await polydateStore.getAllMatches();
  console.log('onBeforeMount');
});

const getColorBanner = (state: number) => {
  if (state === MATCH_STATE.VALIDE) return 'bg-green';
  return 'bg-orange';
};
const matches = computed(() => {
  return polydateStore.userMatches;
});

const validateMatchOrRefused = async (
  matchSrcId: number,
  type: MATCH_STATE
) => {
  await polydateStore.valideOrRefuseMatche(matchSrcId, type);
  setTimeout(() => {
    polydateStore.getAllMatches();
  }, 1000);
};
</script>
