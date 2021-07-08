<template>
  <div>
    <p v-if="description">{{ description }}</p>

    <label v-for="(item, i) in items" :key="i" :class="labelClasses">
      <input
        type="radio"
        :name="name"
        :value="item.value"
        :class="inputClasses"
        :checked="item.checked"
      />
      <b v-if="item.name && item.description">{{ item.name }}</b>
      <span v-if="item.name && item.description">{{ item.description }}</span>
      <span v-if="item.name">{{ item.name }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "RadioButton",

  props: {
    items: {
      type: Array,
      default: () => [],
    },

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
};
</script>

<style lang="scss" scoped></style>
