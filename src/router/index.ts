import { route } from 'quasar/wrappers';
import { useAuthStore } from 'src/stores/authStore';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  Router,
} from 'vue-router';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
let router: Router;

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  router = Router;



  router.beforeEach((to) => {
    const authStore = useAuthStore();

    if (!authStore.isAuthenticated) {
      if (to.path.includes('/login')) {
        return true;
      } else {
        return { path: '/login' };
      }
    } else {
      if (authStore.cookieUser?.userRoleId != 2) {
        if (to.path.includes('/users/control')) {
          return { path: '/polydate' };
        }
      }
      if (to.path === '/') {
        return { path: '/polydate' };
      }

      if (to.path.includes('/login')) {
        return { path: '/polydate' };
      }

      return true;
    }
  });

  return Router;
});
