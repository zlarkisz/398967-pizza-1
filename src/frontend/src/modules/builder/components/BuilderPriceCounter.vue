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
      @click="$emit('makePizza', true)"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { eventBus } from "@/main.js";

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
  },

  data() {
    return {
      pizzaPrice: 0,
    };
  },

  computed: {
    ...mapGetters("Cart", ["totalAmount"]),
  },

  methods: {
    setPizzaPrice({ price }) {
      this.pizzaPrice = price;
    },
  },

  created() {
    eventBus.$on("setPizzaPrice", this.setPizzaPrice);
  },

  beforeDestroy() {
    eventBus.$off("setPizzaPrice");
  },
};
</script>

<style lang="scss" scoped></style>
