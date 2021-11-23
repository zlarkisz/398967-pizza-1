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

  it("check emit and counter", async () => {
    const wrapper = mount(ItemCounter);
    const button = wrapper.find(".counter__button--plus");
    const buttonMin = wrapper.find(".counter__button--minus");

    await button.trigger("click");

    expect(wrapper.vm.counter).toBe(1);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input.length).toBe(1);
    expect(wrapper.emitted().input[0]).toEqual([1]);

    await buttonMin.trigger("click");

    expect(wrapper.vm.counter).toEqual(0);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input.length).toBe(2);
    expect(wrapper.emitted().input[1]).toEqual([0]);
  });
});
