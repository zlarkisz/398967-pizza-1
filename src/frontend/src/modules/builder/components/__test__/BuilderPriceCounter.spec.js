import { shallowMount, createLocalVue } from "@vue/test-utils";
import BuilderPriceCounter from "../BuilderPriceCounter.vue";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

const localVue = createLocalVue();
localVue.use(Vuex);

let store;
let getters;
let wrapper;

const createComponent = (options) => {
  wrapper = shallowMount(BuilderPriceCounter, options);
};

beforeEach(() => {
  getters = {
    Cart: {
      totalAmount: () => 1,
    },
  };
  store = generateMockStore(getters);
});

afterEach(() => {
  wrapper.destroy();
});

it("check is button disabled", async () => {
  createComponent({
    localVue,
    store,
    propsData: { buttonText: "button text", isDisabled: true },
  });

  const button = wrapper.find(".button");

  await button.trigger("click");

  expect(button.attributes("disabled")).toBe("disabled");
  expect(button.classes()).toContain("button--disabled");
  expect(wrapper.emitted().makePizza).toBe(undefined);
});

it("check if text exist when set prop buttonText", () => {
  createComponent({
    localVue,
    store,
    propsData: { buttonText: "button text" },
  });

  const button = wrapper.find(".button");

  expect(button.text()).toEqual("button text");
});

it("on button click check should emit true when button does not disabled", async () => {
  createComponent({
    localVue,
    store,
    propsData: {
      buttonText: "button text",
      pizzaAmount: true,
      isDisabled: false,
      pizzaPrice: 400,
    },
  });

  const button = wrapper.find(".button");

  await button.trigger("click");
  expect(wrapper.emitted().makePizza).toBeTruthy();
  expect(wrapper.emitted().makePizza.length).toBe(1);
  expect(wrapper.emitted().makePizza[0]).toEqual([true]);
});
