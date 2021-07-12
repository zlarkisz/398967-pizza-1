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
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="incrementCounter()"
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
      if (this.counter !== 0) this.counter--;
    },
    incrementCounter() {
      this.counter++;
    },
  },
};
</script>

<style lang="scss" scoped></style>
