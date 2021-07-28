import pizza from "@/static/pizza.json";

export default {
  namespaced: true,

  state: {
    dough: pizza.dough,
    sizes: pizza.sizes,
    sauces: pizza.sauces,
    ingredients: pizza.ingredients,
  },

  getters: {
    doughList: (state) => state.dough,

    sizesList: (state) => state.sizes,

    saucesList: (state) => state.sauces,

    ingredientsList: (state) => state.ingredients,
  },
};
