<template>
  <label>
    <span :class="labelClass">{{ label }}</span>

    <select :name="name" class="select" @input="onInput">
      <option
        v-for="option in options"
        :key="option.text"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  name: "BaseSelect",

  props: {
    label: {
      type: String,
      default: "",
    },

    name: {
      type: String,
      default: "test",
    },

    options: {
      type: Array,
      default: () => [],
    },

    labelClass: {
      type: String,
      default: "",
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
