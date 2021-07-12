<template>
  <div class="counter counter--orange ingridients__counter">
    <button
      type="button"
      ref="min"
      :class="[
        'counter__button',
        { 'counter__button--disabled': counter <= 0 },
        'counter__button--minus',
      ]"
      @click="reduceСounter;"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="counter" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="incrementCounter"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",

  data() {
    return {
      counter: 0,
    };
  },

  methods: {
    reduceСounter() {
      this.counter--;
    },
    incrementCounter() {
      this.counter++;
    },
  },

  mounted() {
    this.$refs.min.addEventListener("click", () => this.counter--);
  },
};
</script>

<style lang="scss" scoped></style>
