<template>
  <span :class="['filling', `filling--${imageClass}`]">
    {{ name }}
  </span>
</template>

<script>
export default {
  name: "SelectorItem",

  props: {
    imageClass: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/filling";
</style>
