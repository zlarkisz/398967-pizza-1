import Vue from "vue";
import App from "./App.vue";
// import router from "@/router/index";
import store from "@/store/index";
import "@/plugins/vuePlugins";
export const eventBus = new Vue();

Vue.config.productionTip = false;

const init = async () => {
  const module = await import("@/router");
  const router = await module.default;

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
};

init();
