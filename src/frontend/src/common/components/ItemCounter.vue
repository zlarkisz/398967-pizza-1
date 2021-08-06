<template>
  <div class="counter counter--orange">
    <button
      type="button"
      ref="min"
      :class="minusBtnClasses"
      :disabled="counter <= 0"
      @click="reduceСounter()"
    >
      <span class="visually-hidden">Меньше</span>
    </button>

    <input
      type="number"
      name="counter"
      class="counter__input"
      :min="0"
      v-model="counter"
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

  data() {
    return {
      counter: this.value || 0,
    };
  },

  watch: {
    counter: "onInput",
  },

  computed: {
    minusBtnClasses() {
      return [
        "counter__button",
        "counter__button--minus",
        { "counter__button--disabled": this.counter <= 0 },
      ];
    },

    plusBtnClasses() {
      return [
        "counter__button",
        "counter__button--plus",
        this.plusBtnTheme && `counter__button--${this.plusBtnTheme}`,
      ];
    },
  },

  methods: {
    reduceСounter() {
      if (this.counter !== 0) {
        this.counter--;
      }
    },

    incrementCounter() {
      this.counter++;
    },

    onInput(value) {
      !isNaN(value) && value !== "" && value > 0
        ? this.$emit("input", parseInt(value))
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
