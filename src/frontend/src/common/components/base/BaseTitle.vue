<template>
  <component
    :is="tag"
    :class="['title', `title--${size}`, { sheet__title: sheet }]"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: "BaseTitle",

  props: {
    level: {
      type: [Number, String],
      default: "",
    },

    size: {
      type: String,
      default: "small",
    },

    sheet: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    tag() {
      const level = this.level || 2;
      return `h${level}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
