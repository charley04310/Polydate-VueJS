import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () =>
          import('src/pages/connexion/page/IndexConnexionPage.vue'),
      },
    ],
  },
  {
    path: '/polydate',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/polydate/IndexPolydatePage.vue'),
      },
    ],
  },
  {
    path: '/profil',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/profil/ProfilEditPage.vue'),
      },
    ],
  },
  {
    path: '/matches',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/match/IndexAllMatchPage.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
