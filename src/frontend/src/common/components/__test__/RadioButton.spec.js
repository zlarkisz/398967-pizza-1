import { mount } from "@vue/test-utils";
import RadioButton from "@/common/components/RadioButton.vue";

describe("RadioButton components", () => {
  it("cehcked && props test", () => {
    const name = "Pedro";
    const size = "sm";
    const labelType = "labelType";
    const inputVisuallyHidden = false;
    const description = "description";
    const checked = false;
    const itemName = "itemName";
    const radioValue = 1;
    const itemDescription = "itemDescription";
    const wrapper = mount(RadioButton, {
      propsData: {
        name,
        size,
        labelType,
        inputVisuallyHidden,
        description,
        checked,
        itemName,
        radioValue,
        itemDescription,
      },
    });
    expect(wrapper.props("name")).toBe("Pedro");
    expect(wrapper.props("size")).toBe("sm");
    expect(wrapper.props("labelType")).toBe("labelType");
    expect(wrapper.props("inputVisuallyHidden")).toBe(false);
    expect(wrapper.props("description")).toBe("description");
    expect(wrapper.props("checked")).toBe(false);
    expect(wrapper.props("itemName")).toBe("itemName");
    expect(wrapper.props("radioValue")).toBe(1);
    expect(wrapper.props("itemDescription")).toBe("itemDescription");
  });

  it("setChecked radio", async () => {
    const name = "Pedro";
    const wrapper = mount(RadioButton, {
      propsData: {
        name,
      },
    });
    const radioInput = wrapper.find('input[type="radio"]');

    await radioInput.setChecked();

    expect(radioInput.element.selected).toBeTruthy();
    expect(wrapper.props("name")).toBe("Pedro");
  });

  it("chacked emit data", () => {
    const wrapper = mount(RadioButton, {
      propsData: {
        name: "LOLIPOP",
      },
    });

    wrapper.vm.$emit("input", true);

    expect(wrapper.emitted("input")).toBeTruthy();
    expect(wrapper.emitted("input").length).toBe(1);
    expect(wrapper.emitted("input")[0]).toEqual([true]);
    expect(wrapper.props("name")).toBe("LOLIPOP");
  });
});
