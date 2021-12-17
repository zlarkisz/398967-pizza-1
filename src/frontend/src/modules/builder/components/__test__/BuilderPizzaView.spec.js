import { shallowMount } from "@vue/test-utils";
import BuilderPizzaView from "../BuilderPizzaView.vue";
import BaseInput from "@/common/components/base/BaseInput";

let wrapper;

const createComponent = (options) => {
  wrapper = shallowMount(BuilderPizzaView, options);
};

it("should emit event when input in BaseInput", async () => {
  createComponent({
    propsData: {
      viewIngredients: [],
      pizzaName: "",
    },
  });

  const input = wrapper.findComponent(BaseInput);
  expect(input.exists()).toBe(true);

  input.vm.$emit("input", "ananas");

  await wrapper.vm.$nextTick();

  expect(wrapper.emitted("setPizzaName")).toBeTruthy();
  expect(wrapper.emitted("setPizzaName").length).toBe(1);
  expect(wrapper.emitted("setPizzaName")[0]).toEqual([
    {
      ingredient: "name",
      value: "ananas",
    },
  ]);
});
