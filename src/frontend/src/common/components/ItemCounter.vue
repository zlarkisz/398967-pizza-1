<template>
  <div class="counter counter--orange">
    <button
      type="button"
      ref="min"
      :class="minusBtnClasses"
      :disabled="value <= 0"
      @click="reduceСounter()"
    >
      <span class="visually-hidden">Меньше</span>
    </button>

    <input
      type="number"
      name="counter"
      class="counter__input"
      :min="0"
      :max="3"
      :value="value"
      @input="onInput"
    />

    <button type="button" :class="plusBtnClasses" @click="incrementCounter()">
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",

  props: {
    plusBtnTheme: {
      type: String,
      default: "",
    },

    value: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    minusBtnClasses() {
      return [
        "counter__button",
        "counter__button--minus",
        { "counter__button--disabled": this.value <= 0 },
      ];
    },

    plusBtnClasses() {
      return [
        "counter__button",
        "counter__button--plus",
        { "counter__button--disabled": this.value >= 3 },
        this.plusBtnTheme && `counter__button--${this.plusBtnTheme}`,
      ];
    },
  },

  methods: {
    reduceСounter() {
      if (this.value !== 0) this.onInput(this.value - 1);
    },

    incrementCounter() {
      if (this.value !== 3) this.onInput(this.value + 1);
    },

    onInput(value) {
      const val = parseInt(value);

      !isNaN(val) && val !== "" && val > 0
        ? this.$emit("input", val)
        : this.$emit("input", 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.counter {
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>
