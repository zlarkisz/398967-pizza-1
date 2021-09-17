import { SET_ENTITY, SET_ORDER_STATUS } from "@/store/mutations-types";

const setCount = (el) => (el.count = 0);

export default {
  namespaced: true,

  state: {
    misc: [],
    order: {
      userId: "",
      pizzas: [],
      misc: [],
      address: {
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      },
    },
    pizzas: [],
    options: [
      { value: 1, text: "Заберу сам" },
      { value: 2, text: "Новый адрес" },
      { value: 3, text: "Дом" },
    ],
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

    async sendAnOrder({ commit }, order) {
      const data = await this.$post.orders.post(order);
      console.log(data);

      commit(SET_ORDER_STATUS, true, { root: true });
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
      state.order.address.name = receiving;
    },

    setPhone(state, phone) {
      state.order.address.comment = phone;
    },

    setStreet(state, street) {
      state.order.address.street = street;
    },

    setHouse(state, house) {
      state.order.address.building = house;
    },

    setApartment(state, apartment) {
      state.order.address.flat = apartment;
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

    setUserId(state, id) {
      state.order.userId = id;
    },
  },
};
