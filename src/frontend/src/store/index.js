import { uniqueId } from "lodash";
import Vue from "vue";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  SET_ORDER_STATUS,
} from "@/store/mutations-types";
import { MESSAGE_LIVE_TIME } from "@/common/constants";
import { SET_ENTITY } from "@/store/mutations-types.js";

import modules from "@/store/modules";

Vue.use(Vuex);

const state = () => ({
  isOrderPlaced: false,
  notifications: [],
});

const actions = {
  async createNotification({ commit }, { ...notification }) {
    const uniqueNotification = {
      ...notification,
      id: uniqueId(),
    };
    commit(ADD_NOTIFICATION, uniqueNotification);
    setTimeout(
      () => commit(DELETE_NOTIFICATION, uniqueNotification.id),
      MESSAGE_LIVE_TIME
    );
  },
};

const mutations = {
  [SET_ORDER_STATUS](state, status) {
    state.isOrderPlaced = status;
  },
  [ADD_NOTIFICATION](state, notification) {
    state.notifications = [...state.notifications, notification];
  },
  [DELETE_NOTIFICATION](state, id) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== id
    );
  },
  [SET_ENTITY](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [VuexPlugins],
  modules,
});
