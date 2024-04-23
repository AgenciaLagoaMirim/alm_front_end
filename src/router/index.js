import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import  useAuthStore  from 'src/stores/userAuth'

export default route(async function () {
  const authStore = useAuthStore()
  authStore.initializeStore();
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // router guard de prevenção de acesso
  Router.beforeEach((to, from, next) => {
    if (
      to.matched.some((record) => record.meta.requiredLogin) &&
      !authStore.isAuthenticated // Alterado para usar authStore diretamente
    ) {
      next({ name: 'login' });
    } else {
      next();
    }
  });

  return Router;
});
