import { shallowMount, createLocalVue } from "@vue/test-utils";
import BuiderSizeSelector from "../BuilderSizeSelector.vue";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import RadioButton from "@/common/components/RadioButton.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let actions;
let store;
let wrapper;

const sizeTestData = [
  {
    name: "23 см",
    image: "/public/img/diameter.svg",
    multiplier: 1,
    value: "small",
    checked: false,
  },
  {
    name: "32 см",
    image: "/public/img/diameter.svg",
    multiplier: 2,
    value: "normal",
    checked: true,
  },
  {
    name: "45 см",
    image: "/public/img/diameter.svg",
    multiplier: 3,
    value: "big",
    checked: false,
  },
];

const createComponent = (options) => {
  wrapper = shallowMount(BuiderSizeSelector, options);
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
    propsData: {
      selectedSize: 0,
    },
  });

  expect(actions.Builder.query).toHaveBeenCalled();
});

it("is data display", () => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "sizes",
      value: sizeTestData,
    },
    { root: true }
  );

  createComponent({
    localVue,
    store,
    propsData: {
      selectedSize: 1,
    },
  });

  const radioButton = wrapper.findAllComponents(RadioButton);

  expect(radioButton.length).toEqual(3);
  expect(radioButton.at(0).props("itemName")).toEqual("23 см");
  expect(radioButton.at(0).props("radioValue")).toBe(1);
  expect(radioButton.at(0).props("size")).toEqual("small");
});

it("when click on radioButton should emit event", async () => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "sizes",
      value: sizeTestData,
    },
    { root: true }
  );

  createComponent({
    localVue,
    store,
    propsData: {
      selectedSize: 0,
    },
  });

  const radioButtons = wrapper.findAllComponents(RadioButton);

  radioButtons.at(2).vm.$emit("input", 3);

  await wrapper.vm.$nextTick();

  expect(wrapper.emitted().setPizzaSize).toBeTruthy();
  expect(wrapper.emitted().setPizzaSize.length).toBe(1);
  expect(wrapper.emitted().setPizzaSize[0]).toEqual([
    {
      ingredient: "sizeId",
      value: 3,
    },
  ]);
});
