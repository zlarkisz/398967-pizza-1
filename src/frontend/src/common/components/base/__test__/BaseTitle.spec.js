import { shallowMount } from "@vue/test-utils";
import BaseTitle from "../BaseTitle.vue";

describe("BaseTitle.vue", () => {
  it("render props", () => {
    const wrapper = shallowMount(BaseTitle, {
      propsData: {
        level: 1,
        size: "small",
        sheet: true,
      },
    });
    expect(wrapper.findAll("h1").exists()).toBe(true);
    expect(wrapper.classes()).toContain("title");
    expect(wrapper.classes()).toContain("title--small");
    expect(wrapper.classes()).toContain("sheet__title");
  });

  it("test slot", () => {
    const wrapper = shallowMount(BaseTitle, {
      slots: {
        default: "Base Title",
      },
    });

    expect(wrapper.html()).toContain("Base Title");
  });
});
