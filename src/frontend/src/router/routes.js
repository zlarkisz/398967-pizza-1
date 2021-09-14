import canRoute from "@/middlewares";

export default [
  {
    path: "/",
    name: "IndexHome",
    component: () => import("@/views/Index.vue"),
    meta: { layout: "AppLayoutMain" },
    beforeEnter: (to, from, next) => {
      canRoute(to, from, next);
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: { layout: "AppLayoutMain" },
    beforeEnter: (to, from, next) => {
      canRoute(to, from, next);
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart.vue"),
    meta: { layout: "AppLayoutDefault" },
    beforeEnter: (to, from, next) => {
      canRoute(to, from, next);
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    meta: { layout: "AppLayoutDefault" },
    beforeEnter: (to, from, next) => {
      canRoute(to, from, next);
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders.vue"),
    meta: { layout: "AppLayoutDefault" },
    beforeEnter: (to, from, next) => {
      canRoute(to, from, next);
    },
  },
];
