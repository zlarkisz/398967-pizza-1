import { shallowMount, createLocalVue } from "@vue/test-utils";
import BuilderIngredientsSelector from "../BuilderIngredientsSelector.vue";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import RadioButton from "@/common/components/RadioButton.vue";
import SelectorItem from "@/common/components/SelectorItem";
import ItemCounter from "@/common/components/ItemCounter";

const localVue = createLocalVue();
localVue.use(Vuex);

let actions;
let store;
let wrapper;

const saucesTestData = [
  {
    name: "Томатный",
    price: 50,
    value: "tomato",
    checked: true,
    id: 0,
  },
  {
    name: "Сливочный",
    price: 50,
    value: "creamy",
    checked: false,
    id: 1,
  },
];

const ingredientsTestData = [
  {
    name: "Грибы",
    image: "/public/img/filling/mushrooms.svg",
    price: 33,
    label: "mushrooms",
    id: 1,
  },
  {
    name: "Чеддер",
    image: "/public/img/filling/cheddar.svg",
    price: 42,
    label: "cheddar",
    id: 2,
  },
  {
    name: "Салями",
    image: "/public/img/filling/salami.svg",
    price: 42,
    label: "salami",
    id: 3,
  },
  {
    name: "Ветчина",
    image: "/public/img/filling/ham.svg",
    price: 42,
    label: "ham",
    id: 4,
  },
  {
    name: "Ананас",
    image: "/public/img/filling/ananas.svg",
    price: 25,
    label: "ananas",
    id: 5,
  },
];

const createComponent = (options) => {
  wrapper = shallowMount(BuilderIngredientsSelector, options);
};

beforeEach(() => {
  actions = {
    Builder: {
      query: jest.fn(),
    },
  };
  store = generateMockStore(actions);
});

afterEach(() => {
  wrapper.destroy();
});

it("should call query action on created hook", () => {
  createComponent({
    localVue,
    store,
    propsData: { ingredientsCounts: [], selectedSauce: 1 },
  });

  expect(actions.Builder.query).toHaveBeenCalled();
});

it("should show 2 sauces radio buttons after commit sauces", () => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "sauces",
      value: saucesTestData,
    },
    { root: true }
  );

  createComponent({
    localVue,
    store,
    propsData: { ingredientsCounts: [], selectedSauce: 1 },
  });

  const radioButton = wrapper.findAllComponents(RadioButton);

  expect(radioButton.length).toEqual(2);
  expect(radioButton.at(0).props("itemName")).toEqual("Томатный");
  expect(radioButton.at(0).props("radioValue")).toBe(0);
  expect(radioButton.at(0).props("checked")).toBe(false);
});

it("when click on radioButton should emit event", async () => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "sauces",
      value: saucesTestData,
    },
    { root: true }
  );

  createComponent({
    localVue,
    store,
    propsData: { ingredientsCounts: [], selectedSauce: 1 },
  });

  const radioButtons = wrapper.findAllComponents(RadioButton);

  radioButtons.at(1).vm.$emit("input", 1);

  await wrapper.vm.$nextTick();

  expect(wrapper.emitted().setPizzaSauce).toBeTruthy();
  expect(wrapper.emitted().setPizzaSauce.length).toBe(1);
  expect(wrapper.emitted().setPizzaSauce[0]).toEqual([
    {
      ingredient: "sauceId",
      value: 1,
    },
  ]);
  expect(radioButtons.at(0).props("checked")).toBe(false);
  expect(radioButtons.at(1).props("checked")).toBe(true);
});

it("should show 5 SelectorItem after commit ingredients", () => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "ingredients",
      value: ingredientsTestData,
    },
    { root: true }
  );

  createComponent({
    localVue,
    store,
    propsData: { ingredientsCounts: [], selectedSauce: 1 },
  });

  const selectorItems = wrapper.findAllComponents(SelectorItem);

  expect(selectorItems.length).toBe(5);
  expect(selectorItems.at(0).props("imageClass")).toEqual("mushrooms");
  expect(selectorItems.at(0).props("name")).toEqual("Грибы");
});

it("should show 5 ItemCounter after commit ingredients", () => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "ingredients",
      value: ingredientsTestData,
    },
    { root: true }
  );

  createComponent({
    localVue,
    store,
    propsData: { ingredientsCounts: [], selectedSauce: 1 },
  });

  const itemCounters = wrapper.findAllComponents(ItemCounter);

  expect(itemCounters.length).toBe(5);
});

it("when click on ItemCounter should emit event setPizzaIngredient && setViewIngredients", async () => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "ingredients",
      value: ingredientsTestData,
    },
    { root: true }
  );

  createComponent({
    localVue,
    store,
    propsData: { ingredientsCounts: [], selectedSauce: 1 },
  });

  const itemCounters = wrapper.findAllComponents(ItemCounter);

  itemCounters.at(4).vm.$emit("input", 2);

  await wrapper.vm.$nextTick();

  expect(wrapper.emitted().setPizzaIngredient).toBeTruthy();
  expect(wrapper.emitted().setViewIngredients).toBeTruthy();
  expect(wrapper.emitted().setPizzaIngredient.length).toBe(1);
  expect(wrapper.emitted().setViewIngredients.length).toBe(1);
  expect(wrapper.emitted().setPizzaIngredient[0]).toEqual([
    {
      ingredientId: 5,
      quantity: 2,
    },
  ]);
  expect(wrapper.emitted().setViewIngredients[0]).toEqual([
    {
      name: "ananas",
      count: 2,
    },
  ]);
});
