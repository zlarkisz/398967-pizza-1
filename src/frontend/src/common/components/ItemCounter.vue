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
      type="text"
      name="counter"
      class="counter__input"
      :value="counter"
      :disabled="counter <= 0"
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
        this.onInput(false, this.counter);
      }
    },

    incrementCounter() {
      this.counter++;
      this.onInput(false, this.counter);
    },

    onInput(e, value = false) {
      e ? this.$emit("input", +e.target.value) : this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
