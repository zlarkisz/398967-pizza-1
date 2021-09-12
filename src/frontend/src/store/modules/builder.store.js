import { SET_ENTITY } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    dough: [],
    sizes: [],
    sauces: [],
    ingredients: [],
    pizzas: [
      {
        name: "",
        sauceId: 0,
        doughId: 0,
        sizeId: 0,
        quantity: 0,
        ingredients: [
          {
            ingredientId: 0,
            quantity: 0,
          },
        ],
      },
    ],
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
