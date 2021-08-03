import Vue from "vue";
import Vuex from "vuex";

import modules from "@/store/modules";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    totalAmount: 0,
    isOrderPlaced: false,
  },

  getters: {
    totalAmount: (state) => state.totalAmount,
    orderStatus: (state) => state.isOrderPlaced,
  },

  mutations: {
    changeAmount(state, amount) {
      state.totalAmount = state.totalAmount + amount;
    },
    setOrderStatus(state, status) {
      state.isOrderPlaced = status;
    },
  },

  modules,
});
