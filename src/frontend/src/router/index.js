import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import JwtService from "@/services/jwt.service";

Vue.use(VueRouter);

export default Promise.all(routes).then((routes) => {
  const router = new VueRouter({
    mode: "history",
    routes,
  });

  router.beforeEach((to, from, next) => {
    console.log(to);
    const isAuth = JwtService.getToken();

    if (to.fullPath === "/" && !isAuth) {
      return next();
    } else if (to.fullPath === "/cart" && !isAuth) {
      return next();
    } else if (to.fullPath !== "/login" && !isAuth) {
      return next({ name: "Login" });
    } else {
      return next();
    }
  });

  return router;
});
