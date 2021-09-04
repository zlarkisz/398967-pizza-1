import pizza from "@/static/pizza.json";

export default {
  namespaced: true,

  state: {
    dough: pizza.dough,
    sizes: pizza.sizes,
    sauces: pizza.sauces,
    ingredients: pizza.ingredients,
  },

  // actions: {

  // }
};
