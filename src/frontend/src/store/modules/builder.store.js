import pizza from "@/static/pizza.json";
import { SET_ENTITY } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    dough: [],
    sizes: pizza.sizes,
    sauces: pizza.sauces,
    ingredients: pizza.ingredients,
  },

  actions: {
    async query({ commit }, type) {
      const data = await this.$api[type].query();
      commit(
        SET_ENTITY,
        {
          module: "Builder",
          entity: type,
          value: data,
        },
        { root: true }
      );
    },
  },
};
