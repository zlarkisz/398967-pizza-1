import { shallowMount, createLocalVue } from "@vue/test-utils";
import BuilderDoughSelector from "../BuilderDoughSelector.vue";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import RadioButton from "@/common/components/RadioButton.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let actions;
let store;
let wrapper;

const doughTestData = [
  {
    name: "Тонкое",
    image: "/public/img/dough-light.svg",
    description: "Из твердых сортов пшеницы",
    price: 100,
    value: "light",
    checked: true,
  },
  {
    name: "Тонкое 2",
    image: "/public/img/dough-light.svg",
    description: "Из твердых сортов пшеницы",
    price: 200,
    value: "light",
    checked: true,
  },
  {
    name: "Тонкое 3",
    image: "/public/img/dough-light.svg",
    description: "Из твердых сортов пшеницы",
    price: 300,
    value: "light",
    checked: true,
  },
];

const createComponent = (options) => {
  wrapper = shallowMount(BuilderDoughSelector, options);
};

// call this code before every test
beforeEach(() => {
  actions = {
    //module
    Builder: {
      //module action
      query: jest.fn(),
    },
  };
  store = generateMockStore(actions);
});

// call after every test end
afterEach(() => {
  wrapper.destroy();
});

it("should call query action on created hook", () => {
  //render component
  createComponent({
    localVue,
    store,
    propsData: {
      selectedDough: 0,
    },
  });

  expect(actions.Builder.query).toHaveBeenCalled();
});

it("is data display", () => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "dough",
      value: doughTestData,
    },
    { root: true }
  );

  createComponent({
    localVue,
    store,
    propsData: {
      selectedDough: 0,
    },
  });

  const radioButtons = wrapper.findAllComponents(RadioButton);

  expect(radioButtons.length).toEqual(3);
  expect(radioButtons.at(0).props("itemName")).toEqual("Тонкое");
  expect(radioButtons.at(0).props("itemDescription")).toEqual(
    "Из твердых сортов пшеницы"
  );
  expect(radioButtons.at(0).props("size")).toEqual("light");
});
it("on radioButton click should emit event", async () => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "dough",
      value: doughTestData,
    },
    { root: true }
  );

  createComponent({
    localVue,
    store,
    propsData: {
      selectedDough: 1,
    },
  });

  const radioButtons = wrapper.findAllComponents(RadioButton);

  radioButtons.at(2).vm.$emit("input", 1);

  await wrapper.vm.$nextTick();

  expect(wrapper.emitted().setPizzaDough).toBeTruthy();
  expect(wrapper.emitted().setPizzaDough.length).toBe(1);
  expect(wrapper.emitted().setPizzaDough[0]).toEqual([
    {
      ingredient: "doughId",
      value: 1,
    },
  ]);
});
