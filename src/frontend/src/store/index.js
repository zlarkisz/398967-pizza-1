import Vue from "vue";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";

import modules from "@/store/modules";

Vue.use(Vuex);

const state = () => ({
  isOrderPlaced: false,
});

const mutations = {
  setOrderStatus(state, status) {
    state.isOrderPlaced = status;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  plugins: [VuexPlugins],
  modules,
});
