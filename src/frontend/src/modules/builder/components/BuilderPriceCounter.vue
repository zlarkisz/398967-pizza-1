<template>
  <div class="content__result">
    <p>Итого: {{ totalAmount }} ₽</p>
    <button
      type="button"
      :class="['button', { 'button--disabled': !totalAmount }]"
      :disabled="!totalAmount"
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
    ...mapGetters("Cart", ["totalAmount"]),
  },
};
</script>

<style lang="scss" scoped></style>
