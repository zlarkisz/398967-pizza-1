<template>
  <label :class="['input', { 'input--big-label': bigLabel }]">
    <span :class="{ 'visually-hidden': hideLabel }">
      {{ label }}
    </span>

    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      @input="onInput"
    />
  </label>
</template>

<script>
export default {
  name: "BaseInput",

  props: {
    label: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      default: "text",
    },

    name: {
      type: String,
      default: "",
    },

    placeholder: {
      type: String,
      default: "",
    },

    hideLabel: {
      type: Boolean,
      default: false,
    },

    bigLabel: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
