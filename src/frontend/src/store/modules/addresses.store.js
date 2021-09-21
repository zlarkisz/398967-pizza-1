import { SET_ENTITY } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    addresses: [],
  },

  actions: {
    async query({ commit }) {
      const data = await this.$api.addresses.query();
      commit(
        SET_ENTITY,
        { module: "Addresses", entity: "addresses", value: data },
        { root: true }
      );
    },

    async post({ commit }, address) {
      const data = await this.$api.addresses.post(address);
      console.log(data);

      commit("addAddress", data);
    },
  },

  mutations: {
    addAddress(state, address) {
      state.addresses.push(address);
    },
  },
};
