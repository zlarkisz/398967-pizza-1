import misc from "@/static/misc.json";

export default {
  namespaced: true,

  state: {
    additions: misc,
    cart: [
      {
        img: { src: require("@/assets/img/product.svg"), alt: "Капричоза" },
        title: "Капричоза",
        description: [
          "30 см, на тонком тесте",
          "Соус: томатный",
          "Начинка: грибы, лук, ветчина, пармезан, ананас",
        ],
        count: 1,
        price: 782,
      },
      {
        img: {
          src: require("@/assets/img/product.svg"),
          alt: "Любимая пицца",
        },
        title: "Любимая пицца",
        description: [
          "30 см, на тонком тесте",
          "Соус: томатный",
          "Начинка: грибы, лук, ветчина, пармезан, ананас, бекон, блючиз",
        ],
        count: 2,
        price: 782,
      },
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

  getters: {
    cartAmount: (state) => {
      return state.cart.reduce((acc, el) => {
        acc += el.count * el.price;
        return acc;
      }, 0);
    },
    additionsAmount: (state) => {
      return state.additions.reduce((acc, el) => {
        acc += el.count * el.price;
        return acc;
      }, 0);
    },
    totalAmount: (state, getters) => {
      return getters.cartAmount + getters.additionsAmount;
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
    changeAmount(state, { cartIndex, count, cartList }) {
      state[cartList][cartIndex].count = count;
    },
  },
};
