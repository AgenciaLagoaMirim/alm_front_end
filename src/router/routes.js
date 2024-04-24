const routes = [
  {
    path: "/dash-board",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue"), name: "dash-board" },
      { path: "/data-dash", component: () => import("src/pages/DataDashPage.vue"), name: "data-dash"},
      { path: "/stamvi", component: () => import("src/pages/StamviPage.vue"), name: "stamvi"}
    ],
    meta: {
      requiredLogin: true,
    },
  },
  {
    path: "/register",
    component: () => import("src/pages/UserRegisterPage.vue"),
    name: "register",
  },
  {
    path: "/",
    component: () => import("src/pages/UserLoginPage.vue"),
    name: "login",
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
