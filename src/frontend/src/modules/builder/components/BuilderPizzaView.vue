<template>
  <div class="content__pizza">
    <BaseInput
      label="Название пиццы"
      placeholder="Введите название пиццы"
      name="pizza_name"
      hideLabel
      v-model="pizzaName"
      @input="setName"
    />

    <div
      @drop="onDrop"
      @dragover.prevent
      @dragenter.prevent
      class="content__constructor"
    >
      <div class="pizza pizza--foundation--big-tomato">
        <div class="pizza__wrapper">
          <div
            v-for="(el, i) in drops"
            :key="i"
            :class="['pizza__filling', `pizza__filling--${el}`]"
          />
        </div>
      </div>
    </div>

    <BuilderPriceCounter
      pizzaAmount
      @makePizza="$emit('makePizza', true)"
      buttonText="Готовьте!"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import { eventBus } from "@/main.js";

import BaseInput from "@/common/components/base/BaseInput";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "BuilderPizzaView",

  components: {
    BaseInput,
    BuilderPriceCounter,
  },

  data() {
    return {
      pizzaName: "",
      drops: [],
      name: "",
      count: 0,
    };
  },

  methods: {
    ...mapMutations({ setPizzaName: "Builder/setPizzaOptions" }),
    ...mapMutations({ setPizza: "Cart/setPizza" }),

    onDrop(evt) {
      const draggedElement = evt.dataTransfer.getData("item");
      if (this.drops.includes(draggedElement)) return;
      this.drops.push(draggedElement);
    },

    setName(e) {
      this.$emit("setPizzaName", { ingredient: "name", value: e });
    },

    setDrop({ name, count }) {
      if (count !== 0) {
        if (this.drops.includes(name)) return;

        this.drops.push(name);
      } else {
        this.drops = this.drops.filter((el) => el !== name);
      }
    },
  },

  created() {
    eventBus.$on("setIngredients", this.setDrop);
  },

  beforeDestroy() {
    eventBus.$off("setIngredients");
  },
};
</script>

<style lang="scss" scoped></style>
