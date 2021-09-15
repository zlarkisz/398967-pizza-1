import { SET_ENTITY } from "@/store/mutations-types";

const setCount = (el) => (el.count = 0);

export default {
  namespaced: true,

  state: {
    misc: [],
    order: {
      userId: "",
      pizzas: [
        {
          name: "",
          sauceId: 0,
          doughId: 0,
          sizeId: 0,
          quantity: 0,
          ingredients: [],
        },
      ],
      misc: [
        {
          miscId: 0,
          quantity: 0,
        },
      ],
      address: {
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      },
    },
    cart: [
      // {
      //   img: { src: require("@/assets/img/product.svg"), alt: "Капричоза" },
      //   title: "Капричоза",
      //   description: [
      //     "30 см, на тонком тесте",
      //     "Соус: томатный",
      //     "Начинка: грибы, лук, ветчина, пармезан, ананас",
      //   ],
      //   count: 1,
      //   price: 782,
      // },
      // {
      //   img: {
      //     src: require("@/assets/img/product.svg"),
      //     alt: "Любимая пицца",
      //   },
      //   title: "Любимая пицца",
      //   description: [
      //     "30 см, на тонком тесте",
      //     "Соус: томатный",
      //     "Начинка: грибы, лук, ветчина, пармезан, ананас, бекон, блючиз",
      //   ],
      //   count: 2,
      //   price: 782,
      // },
    ],
    options: [
      { value: 1, text: "Заберу сам" },
      { value: 2, text: "Новый адрес" },
      { value: 3, text: "Дом" },
    ],
    receiving: "",
    phone: "",
    street: "",
    house: "",
    apartment: "",
    totalAmount: 0,
  },

  actions: {
    async query({ commit }, type) {
      const data = await this.$api[type].query();
      const mutatedData = data.map(setCount);

      type === "misc" ? mutatedData : data;

      commit(
        SET_ENTITY,
        { module: "Cart", entity: type, value: data },
        { root: true }
      );
    },
  },

  getters: {
    doughAmount(state, getters, rootState) {
      const doughtPrice = rootState.Builder.dough.find(
        (el) => el.id === rootState.Builder.pizza.doughId
      );

      return doughtPrice?.price || 0;
    },

    sauceAmount(state, getters, rootState) {
      const saucePrice = rootState.Builder.sauces.find(
        (el) => el.id === rootState.Builder.pizza.sauceId
      );

      return saucePrice?.price || 0;
    },

    ingredientsAmount(state, getters, rootState) {
      return rootState.Builder.pizza.ingredients.reduce((acc, el) => {
        rootState.Builder.ingredients.forEach((ing) => {
          if (ing.id === el.ingredientId) {
            let currentIng = el;

            acc += currentIng.quantity * ing.price;
          }
        });

        return acc;
      }, 0);
    },

    cartAmount: (state) => {
      return state.cart.reduce((acc, el) => {
        acc += el.count * el.price;
        return acc;
      }, 0);
    },

    additionsAmount: (state) => {
      return state.misc.reduce((acc, el) => {
        acc += el.count * el.price;
        return acc;
      }, 0);
    },

    totalAmount: (state, getters) => {
      return (
        getters.cartAmount +
        getters.doughAmount +
        getters.sauceAmount +
        getters.ingredientsAmount +
        getters.additionsAmount
      );
    },
  },

  mutations: {
    setOrderReceiving(state, receiving) {
      state.receiving = receiving;
    },
    setPhone(state, phone) {
      state.phone = phone;
    },
    setStreet(state, street) {
      state.street = street;
    },
    setHouse(state, house) {
      state.house = house;
    },
    setApartment(state, apartment) {
      state.apartment = apartment;
    },
    changeAmount(state, { id, count, list }) {
      state[list][id - 1].count = count;
    },
  },
};
