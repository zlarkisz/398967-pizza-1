import { SET_ENTITY } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    dough: [],
    sizes: [],
    sauces: [],
    ingredients: [],
    pizza: {
      name: "",
      sauceId: 0,
      doughId: 0,
      sizeId: 0,
      quantity: 0,
      ingredients: [],
    },
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

  mutations: {
    setPizzaOptions(state, { ingredient, value }) {
      state.pizza[ingredient] = value;
    },
    setPizzaIngredients(state, ingredient) {
      if (ingredient.quantity === 0) {
        state.pizza.ingredients = state.pizza.ingredients.filter(
          (el) => el.ingredientId !== ingredient.ingredientId
        );
      } else if (state.pizza.ingredients.length) {
        if (
          state.pizza.ingredients.some(
            (el) => el.ingredientId === ingredient.ingredientId
          )
        ) {
          state.pizza.ingredients.forEach((el) => {
            if (el.ingredientId === ingredient.ingredientId) {
              el.quantity = ingredient.quantity;
            }
          });
        } else {
          state.pizza.ingredients.push(ingredient);
        }
      } else {
        state.pizza.ingredients.push(ingredient);
      }
    },
  },
};
