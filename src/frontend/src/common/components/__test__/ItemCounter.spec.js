import { mount } from "@vue/test-utils";
import ItemCounter from "@/common/components/ItemCounter.vue";

describe("ItemCounter.vue", () => {
  it("check ItemCounter props", () => {
    const wrapper = mount(ItemCounter, {
      propsData: {
        plusBtnTheme: "small",
        value: 0,
      },
    });
    const button = wrapper.find(".counter__button--plus");

    expect(wrapper.props("value")).toBe(0);
    expect(button.classes()).toContain(
      `counter__button--${wrapper.vm.plusBtnTheme}`
    );
  });

  it("check emit", () => {
    const wrapper = mount(ItemCounter);

    wrapper.vm.$emit("input", 1);
    wrapper.vm.$emit("input", 0);

    expect(wrapper.emitted("input")).toBeTruthy();
    expect(wrapper.emitted("input").length).toBe(2);
    expect(wrapper.emitted("input")[1]).toEqual([0]);
  });

  it("check counter", () => {
    const wrapper = mount(ItemCounter, {
      data() {
        return {
          counter: 0,
        };
      },
    });
    wrapper.vm.incrementCounter();
    wrapper.vm.reduceСounter();
    expect(wrapper.vm.counter).toBe(0);
  });
});
