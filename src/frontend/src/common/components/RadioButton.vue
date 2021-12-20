<template>
  <label :class="labelClasses">
    <input
      type="radio"
      :name="name"
      :value="radioValue"
      :class="inputClasses"
      :checked="checked"
      @input="onInput"
    />
    <b v-if="itemName && itemDescription">
      {{ itemName }}
    </b>
    <span v-if="itemName && itemDescription">
      {{ itemDescription }}
    </span>
    <span v-if="itemName">
      {{ itemName }}
    </span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",

  props: {
    name: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      default: "",
    },

    labelType: {
      type: String,
      default: "",
    },

    inputVisuallyHidden: {
      type: Boolean,
      default: true,
    },

    description: {
      type: String,
      default: "",
    },

    checked: {
      type: Boolean,
      default: false,
    },

    itemName: {
      type: String,
      default: "",
    },

    radioValue: {
      type: [String, Number],
    },

    itemDescription: {
      type: String,
      default: "",
    },
  },

  computed: {
    labelClasses() {
      return [
        this.labelType,
        `${this.name}__input`,
        this.size && `${this.name}__input--${this.size}`,
      ];
    },

    inputClasses() {
      return this.inputVisuallyHidden && "visually-hidden";
    },
  },

  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/radio";
</style>
