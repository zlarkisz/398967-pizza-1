import { shallowMount } from "@vue/test-utils";
import BaseSelect from "../BaseSelect.vue";

describe("BaseSelect", () => {
  it("render props", () => {
    const wrapper = shallowMount(BaseSelect, {
      propsData: {
        label: "select label",
        name: "select name",
        options: [
          { value: 1, text: "select-1" },
          { value: 2, text: "select-2" },
          { value: 3, text: "select-3" },
        ],
        labelClass: "label label--big",
      },
    });
    const span = wrapper.find("span");

    expect(span.text()).toContain("select label");
    expect(span.classes().length).toEqual(2);
    expect(wrapper.props("name")).toBe("select name");
    expect(wrapper.vm.options.length).toBe(3);
  });

  it("setSelected demo", () => {
    const wrapper = shallowMount(BaseSelect, {
      propsData: {
        options: [
          { value: 1, text: "select-1" },
          { value: 2, text: "select-2" },
          { value: 3, text: "select-3" },
        ],
      },
    });

    const select = wrapper.find("select");
    const options = select.findAll("option");

    options.at(1).setSelected();
    expect(wrapper.find("option:checked").element.value).toBe("2");
  });

  it("emited demo", async () => {
    const wrapper = shallowMount(BaseSelect);

    wrapper.vm.$emit("input");
    wrapper.vm.$emit("input", 123);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input.length).toBe(2);
    expect(wrapper.emitted().input[1]).toEqual([123]);
  });
});
