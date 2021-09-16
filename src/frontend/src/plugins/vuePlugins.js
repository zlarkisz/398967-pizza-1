import Vue from "vue";
import JWTService from "@/services/jwt.service";
import Notifier from "@/plugins/notifier";
import store from "@/store";
import { createResources, postResources } from "@/common/helpers";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $jwt: () => JWTService,
        $notifier: () => new Notifier(store),
        $api() {
          return createResources(this.$notifier);
        },
        $post() {
          return postResources(this.$notifier);
        },
      },
    });
  },
};

Vue.use(plugins);
