import { shallowMount } from "@vue/test-utils";
import BaseInput from "../BaseInput.vue";

describe("BaseInput", () => {
  it("render props", () => {
    const wrapper = shallowMount(BaseInput, {
      propsData: {
        label: "input label",
        type: "number",
        name: "input name",
        placeholder: "input placeholder",
        hideLabel: true,
        bigLabel: true,
        required: true,
      },
    });
    const span = wrapper.find("span");
    const label = wrapper.find("label");

    expect(span.text()).toContain("input label");
    expect(span.classes()).toContain("visually-hidden");
    expect(label.classes()).toContain("input--big-label");
    expect(wrapper.props("type")).toBe("number");
    expect(wrapper.props("name")).toBe("input name");
    expect(wrapper.props("placeholder")).toBe("input placeholder");
    expect(wrapper.vm.required).toBe(true);
  });

  it("emit demo", async () => {
    const wrapper = shallowMount(BaseInput);

    wrapper.vm.$emit("input");
    wrapper.vm.$emit("input", "Pedro");

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input.length).toBe(2);
    expect(wrapper.emitted().input[1]).toEqual(["Pedro"]);
  });
});
