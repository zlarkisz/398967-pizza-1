<template>
  <label class="input">
    <span class="visually-hidden">{{ label }}</span>
    <input :type="type" :name="name" :placeholder="placeholder" />
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
  },
};
</script>

<style lang="scss" scoped></style>
