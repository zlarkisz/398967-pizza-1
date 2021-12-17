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
    const input = wrapper.find(".counter__input");

    expect(input.element.value).toBe("0");
    expect(button.classes()).toContain(
      `counter__button--${wrapper.vm.plusBtnTheme}`
    );
  });

  it("check emit when click on plus button", async () => {
    const wrapper = mount(ItemCounter, {
      propsData: {
        value: 0,
      },
    });
    const button = wrapper.find(".counter__button--plus");

    await button.trigger("click");

    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input.length).toBe(1);
    expect(wrapper.emitted().input[0]).toEqual([1]);
  });

  it("check emit when click on minus button", async () => {
    const wrapper = mount(ItemCounter, {
      propsData: {
        value: 1,
      },
    });
    const buttonMin = wrapper.find(".counter__button--minus");

    await buttonMin.trigger("click");

    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input.length).toBe(1);
    expect(wrapper.emitted().input[0]).toEqual([0]);
  });

  it("when entered string, value should emit 0", async () => {
    const wrapper = mount(ItemCounter);
    const input = wrapper.find(".counter__input");

    await input.setValue("some value");

    expect(input.element.value).toBe("");
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input.length).toBe(1);
    expect(wrapper.emitted().input[0]).toEqual([0]);
  });
});
