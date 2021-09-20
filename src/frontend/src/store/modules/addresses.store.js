import { SET_ENTITY } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    addresses: {},
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
  },
};
