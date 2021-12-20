import { shallowMount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";
import VueRouter from "vue-router";
import IndexHome from "../Index.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import { SET_ENTITY } from "@/store/mutations-types";
import { dough, ingredients, sauces, sizes } from "@/static/pizza.json";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

let store;
let mutations;
let wrapper;
const router = new VueRouter();

const createComponent = (options) => {
  wrapper = shallowMount(IndexHome, options);
};

beforeEach(() => {
  mutations = {
    Cart: {
      setPizza: jest.fn(),
    },
  };
  store = generateMockStore(mutations);
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "dough",
      value: dough,
    },
    { root: true }
  );
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "ingredients",
      value: ingredients,
    },
    { root: true }
  );
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "sauces",
      value: sauces,
    },
    { root: true }
  );
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "sizes",
      value: sizes,
    },
    { root: true }
  );
});

afterEach(() => {
  wrapper.destroy();
});

it("should route to cart when click on BuilderPriceCounter", async () => {
  createComponent({ localVue, store, router });

  const counter = wrapper.findComponent(BuilderPriceCounter);

  counter.vm.$emit("makePizza");

  await wrapper.vm.$nextTick();

  expect(wrapper.vm.$route.path).toBe("/cart");
});

it("should create pizza", async () => {
  createComponent({ localVue, store, router });

  const dough = wrapper.findComponent(BuilderDoughSelector);
  const size = wrapper.findComponent(BuilderSizeSelector);
  const ingredients = wrapper.findComponent(BuilderIngredientsSelector);
  const view = wrapper.findComponent(BuilderPizzaView);
  const counter = wrapper.findComponent(BuilderPriceCounter);

  dough.vm.$emit("setPizzaDough", { ingredient: "doughId", value: 1 });

  size.vm.$emit("setPizzaSize", { ingredient: "sizeId", value: 1 });

  ingredients.vm.$emit("setPizzaIngredient", {
    ingredientId: 5,
    quantity: 1,
  });

  ingredients.vm.$emit("setPizzaSauce", { ingredient: "sauceId", value: 1 });

  view.vm.$emit("setPizzaName", { ingredient: "name", value: "pizza" });

  counter.vm.$emit("makePizza");

  await wrapper.vm.$nextTick();

  expect(store.state.Cart.order.pizzas).toHaveLength(1);
  expect(store.state.Cart.order.pizzas[0]).toEqual({
    name: "pizza",
    sauceId: 1,
    doughId: 1,
    sizeId: 1,
    quantity: 1,
    ingredients: [{ ingredientId: 5, quantity: 1 }],
    price: 375,
  });
});

it("should calculate price", async () => {
  createComponent({ localVue, store, router });

  const dough = wrapper.findComponent(BuilderDoughSelector);
  const size = wrapper.findComponent(BuilderSizeSelector);
  const ingredients = wrapper.findComponent(BuilderIngredientsSelector);
  const counter = wrapper.findComponent(BuilderPriceCounter);

  dough.vm.$emit("setPizzaDough", { ingredient: "doughId", value: 2 });

  size.vm.$emit("setPizzaSize", { ingredient: "sizeId", value: 2 });

  ingredients.vm.$emit("setPizzaIngredient", {
    ingredientId: 5,
    quantity: 3,
  });

  ingredients.vm.$emit("setPizzaSauce", { ingredient: "sauceId", value: 2 });

  await wrapper.vm.$nextTick();

  expect(counter.props("pizzaPrice")).toBe(850);
});
