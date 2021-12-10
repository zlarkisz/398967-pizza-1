<template>
  <div class="content__result">
    <p :key="totalAmount">
      Итого: {{ pizzaAmount ? pizzaPrice : totalAmount }} ₽
    </p>
    <button
      type="button"
      :class="[
        'button',
        {
          'button--disabled':
            isDisabled || (pizzaAmount ? !pizzaPrice : !totalAmount),
        },
      ]"
      :disabled="isDisabled || (pizzaAmount ? !pizzaPrice : !totalAmount)"
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
  },
};
</script>

<style lang="scss" scoped></style>
