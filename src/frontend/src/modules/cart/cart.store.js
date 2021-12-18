import { SET_ENTITY, SET_ORDER_STATUS } from "@/store/mutations-types";
import Vue from "vue";

const setCount = (el) => (el.count = 0);
const getDefaultState = () => {
  return {
    misc: [],
    order: {
      userId: "",
      pizzas: [],
      misc: [],
      address: null,
    },
    pizzas: [],
    options: [
      { value: 1, text: "Заберу сам" },
      { value: 2, text: "Новый адрес" },
    ],
    totalAmount: 0,
  };
};

export default {
  namespaced: true,

  state: getDefaultState(),

  actions: {
    async query({ commit }, type) {
      // debugger;
      const data = await this.$api[type].query();
      data.map(setCount);

      commit(
        SET_ENTITY,
        { module: "Cart", entity: type, value: data },
        { root: true }
      );
    },

    async sendAnOrder({ commit }, order) {
      await this.$api.orders.post(order);
      commit(SET_ORDER_STATUS, true, { root: true });
      commit("resetState");
    },
  },

  getters: {
    pizzasAmount: (state) => {
      return state.order.pizzas.reduce((acc, el) => {
        acc += el.quantity * el.price;
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
      state.order.address = {
        name: receiving,
        street: "",
        building: "",
        flat: "",
        comment: "",
      };
    },

    setOrderAddressNull(state) {
      state.order.address = null;
    },

    setPhone(state, phone) {
      if (!state.order.address) return;
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

    setPizza(state, { pizza, id }) {
      if (id) {
        Vue.set(state.order.pizzas, id, pizza);
      } else {
        state.order.pizzas.push(pizza);
      }
    },

    deletePizza(state, idx) {
      state.order.pizzas = state.order.pizzas.filter((el, i) => i !== idx);
    },

    setPizzaQuantity(state, { idx, quantity }) {
      state.order.pizzas[idx].quantity = quantity;
    },

    setOrderMisc(state, misc) {
      state.order.misc = misc;
    },

    setOrderPizzas(state, pizzas) {
      state.order.pizzas = pizzas;
    },

    setUserId(state, id) {
      state.order.userId = id;
    },

    setOrder(state, newOrder) {
      state.order = newOrder;
    },

    setCartMisc(state, miscs) {
      miscs.forEach((m) => {
        state.misc.forEach((stateMisc) => {
          if (m.miscId === stateMisc.id) {
            stateMisc.count = m.quantity;
          }
        });
      });
    },

    setCartOption(state, option) {
      state.options.push(option);
    },

    setDefaultCartOptions(state, arr) {
      state.options = arr;
    },

    resetState(state) {
      Object.assign(state, getDefaultState());
    },
  },
};
