import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";
import JwtService from "@/services/jwt.service";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    (to.name !== "Login" && !store.state.Auth.isAuthenticated) ||
    !JwtService.getToken()
  )
    next({ name: "Login" });
  else next();
});

export default router;
