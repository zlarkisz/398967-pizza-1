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
      :value="counter"
      disabled
    />

    <!-- @input="onEnter" -->

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
      counter: this.value,
    };
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
        this.onInput(this.counter, "minus");
      }
    },

    incrementCounter() {
      this.counter++;
      this.onInput(this.counter, "plus");
    },

    onInput(value, eventType) {
      this.$emit("input", { value, eventType });
    },

    // onEnter({ target }) {
    //   const inputVal = +target.value;

    //   if (!isNaN(inputVal)) {
    //     this.counter = inputVal;
    //   } else {
    //     this.counter = 0;
    //   }

    //   this.onInput(this.counter, "plus");
    // },
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
