import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import JwtService from "@/services/jwt.service";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = JwtService.getToken();

  if (to.name === "IndexHome" && !isAuth) {
    return next();
  } else if (to.name === "Cart" && !isAuth) {
    return next();
  } else if (to.name !== "Login" && !isAuth) {
    return next({ name: "Login" });
  } else {
    return next();
  }
});

export default router;
