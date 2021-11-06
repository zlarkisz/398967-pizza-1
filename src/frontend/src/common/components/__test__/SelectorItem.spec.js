import { mount } from "@vue/test-utils";
import SelectorItem from "@/common/components/SelectorItem.vue";

describe("SelectorItem.vue", () => {
  it("renders props.name && props.imageClass when passed", () => {
    const wrapper = mount(SelectorItem, {
      propsData: {
        name: "Pedro",
        imageClass: "imageClass",
      },
    });
    expect(wrapper.text()).toContain("Pedro");
    expect(wrapper.props("imageClass")).toBe("imageClass");
  });
});
