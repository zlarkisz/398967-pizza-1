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
    pizzas: [],
    cart: [],
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
    pizzasAmount: (state) => {
      return state.pizzas.reduce((acc, el) => {
        acc += el.quantity * el.price;
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
      return getters.pizzasAmount + getters.additionsAmount;
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

    setPizza(state, pizza) {
      state.pizzas.push(pizza);
    },

    deletePizza(state, idx) {
      state.pizzas = state.pizzas.filter((el, i) => i !== idx);
    },

    setPizzaQuantity(state, { idx, quantity }) {
      state.pizzas[idx].quantity = quantity;
    },
  },
};
