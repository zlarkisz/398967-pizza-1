<template>
  <div class="content__result">
    <p>Итого: {{ amount }} ₽</p>
    <button
      type="button"
      :class="['button', { 'button--disabled': !amount }]"
      :disabled="!amount"
      @click="$emit('submit', true)"
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
  },

  computed: {
    ...mapGetters({ amount: "totalAmount" }),
  },
};
</script>

<style lang="scss" scoped></style>
