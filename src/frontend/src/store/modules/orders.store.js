import { SET_ENTITY } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    orders: [],
  },

  actions: {
    async query({ commit }) {
      const data = await this.$api.orders.query();
      commit(
        SET_ENTITY,
        { module: "Orders", entity: "orders", value: data },
        { root: true }
      );
    },

    async delete({ dispatch }, id) {
      await this.$api.orders.delete(id);
      dispatch("query");
    },
  },
};
