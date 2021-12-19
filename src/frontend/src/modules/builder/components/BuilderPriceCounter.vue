<template>
  <div class="content__result">
    <p :key="totalAmount">Итого: {{ amount }} ₽</p>
    <button
      type="button"
      :class="[
        'button',
        {
          'button--disabled': disabled,
        },
      ]"
      :disabled="disabled"
      @click="$emit('makePizza')"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BuilderPriceCounter",

  props: {
    buttonText: {
      type: String,
      required: true,
    },

    pizzaAmount: {
      type: Boolean,
      default: false,
    },

    isDisabled: {
      type: Boolean,
      default: false,
    },

    pizzaPrice: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    ...mapGetters("Cart", ["totalAmount"]),

    disabled() {
      return (
        this.isDisabled ||
        (this.pizzaAmount ? !this.pizzaPrice : !this.totalAmount)
      );
    },

    amount() {
      return this.pizzaAmount ? this.pizzaPrice : this.totalAmount;
    },
  },
};
</script>

<style lang="scss" scoped></style>
