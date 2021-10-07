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
      :max="3"
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
    counter: {
      immidiate: true,
      handler(v) {
        let count = parseInt(v);

        if (count < 0) {
          this.counter = count = 0;
        } else if (count > 3) {
          this.counter = count = 3;
        }

        this.onInput(count);
      },
    },
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
        { "counter__button--disabled": this.counter >= 3 },
        this.plusBtnTheme && `counter__button--${this.plusBtnTheme}`,
      ];
    },
  },

  methods: {
    reduceСounter() {
      if (this.counter !== 0) this.counter--;
    },

    incrementCounter() {
      if (this.counter !== 3) this.counter++;
    },

    onInput(value) {
      !isNaN(value) && value !== "" && value > 0
        ? this.$emit("input", value)
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
