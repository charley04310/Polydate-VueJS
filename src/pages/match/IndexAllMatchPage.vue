<script lang="ts">
import { getRelativeTime } from 'src/utils/date/composable';
import { useAuthStore } from 'src/stores/authStore';
import { useRouter } from 'vue-router';
</script>

<template>
  <div class="q-pa-md q-gutter-sm window-height">
    <slot v-if="matches !== undefined">
      <q-banner
        v-for="(match, index) in matches"
        :key="index"
        inline-actions
        rounded
        :class="`${getColorBanner(match.matchStatId)} text-white`"
      >
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
            <q-btn
              flat
              @click="userTalkToSomeone(parseInt(match.matchId), match)"
              icon="message"
              label="Discuter"
            />
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
import { IMatcheUser, usePolydateStore } from 'src/stores/polydateStore';
import { computed, onBeforeMount, ref } from 'vue';
const polydateStore = usePolydateStore();
const authStore = useAuthStore();
const router = useRouter();

const userId = computed(() => {
  return authStore.cookieUser?.userId;
});

onBeforeMount(async () => {
  await polydateStore.getAllMatches();
});

const userTalkToSomeone = (matchId: number, match: IMatcheUser) => {
  if (authStore.cookieUser === undefined) {
    return false;
  }

  const receiver = ref(0);

  if (match.matchSrcId.userId === authStore.cookieUser.userId) {
    receiver.value = match.matchDstId.userId;
  } else {
    receiver.value = match.matchSrcId.userId;
  }

  polydateStore.userTalkToSomeOne = {
    matchId: matchId,
    receiver: receiver.value,
    sender: authStore.cookieUser.userId,
  };

  router.push({ path: `matches/${matchId}/messages` });
};

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
  }, 200);
};
</script>
