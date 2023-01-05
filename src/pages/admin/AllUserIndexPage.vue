<script lang="ts">
import { school } from 'src/utils/school/composable';
import { state } from 'src/utils/state/composable';
import { USER_STATE } from 'src/enums/emunsUser';
import { useAdminStore } from 'src/stores/adminStore';
</script>
<template>
  <div class="q-pa-md">
    <q-table
      title="Liste des utilisateurs"
      :rows="allUser"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="q-gutter-x-xs">
            <q-btn
              round
              color="primary"
              @click="banOrUnBanUser(props.row.userId, { userStatId: 5 })"
              size="0.75em"
              glossy
              icon="key_off"
            >
              <q-tooltip>Bannir </q-tooltip>
            </q-btn>
          </div>
          <div class="my-table-details">
            {{ props.row.details }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-school="props">
        <q-td :props="props">
          <div class="q-gutter-x-xs">
            {{ school(props.row.userSchoolId) }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-state="props">
        <q-td :props="props">
          <div>
            <q-badge
              :color="getcolorCell(props.row.userStatId)"
              :label="state(props.row.userStatId)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
const adminStore = useAdminStore();

const allUser = ref();
onBeforeMount(async () => {
  allUser.value = await adminStore.getAllUserQtable();
});

const banOrUnBanUser = async (id: number, data: { userStatId: number }) => {
  await adminStore.banOrUnBanUser(id, data);
  allUser.value = await adminStore.getAllUserQtable();
};
const getcolorCell = (id: USER_STATE) => {
  switch (id) {
    case USER_STATE.VALIDE:
      return 'green';
    case USER_STATE.EN_ATTENTE:
      return 'orange';
    case USER_STATE.BANNIS:
      return 'red';
    default:
      return 'grey';
  }
};
const columns = [
  {
    name: 'nom',
    required: true,
    label: 'Nom',
    align: 'left',
    field: 'userFirstname',
    sortable: true,
  },
  {
    name: 'prenom',
    align: 'left',
    label: 'Prénom',
    field: 'userLastname',
    sortable: true,
  },
  {
    name: 'email',
    label: 'Email',
    align: 'center',
    field: 'userEmail',
    sortable: true,
  },
  {
    name: 'school',
    label: 'Université',
    align: 'center',
    field: 'userSchoolId',
    sortable: true,
  },
  {
    name: 'state',
    label: "État de l'utilisateur",
    align: 'center',
    field: 'userStatId',
    sortable: true,
  },
  {
    name: 'like',
    label: 'Match envoyé',
    align: 'center',
    field: 'userLikeGiven',
    sortable: true,
  },
  {
    name: 'actions',
    label: 'Action',
    align: 'center',
    field: 'actions',
    sortable: true,
  },
];
</script>
