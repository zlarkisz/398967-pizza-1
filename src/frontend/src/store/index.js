import Vue from "vue";
import Vuex from "vuex";

import modules from "@/store/modules";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isOrderPlaced: false,
  },

  mutations: {
    setOrderStatus(state, status) {
      state.isOrderPlaced = status;
    },
  },

  modules,
});
