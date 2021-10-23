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
      if (address.id || address.id === "") {
        delete address.id;
      }
      const data = await this.$api.addresses.post(address);
      commit("addAddress", data);
    },

    async delete({ commit, dispatch }, id) {
      const data = await this.$api.addresses.delete(id);
      commit("addAddress", data);
      dispatch("query");
    },

    async put({ dispatch }, address) {
      try {
        await this.$api.addresses.put(address);
        dispatch("query");
      } catch (e) {
        console.error(e);
      }
    },
  },

  mutations: {
    addAddress(state, address) {
      state.addresses.push(address);
    },
  },
};
