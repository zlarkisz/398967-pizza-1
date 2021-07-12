<template>
  <div class="content__pizza">
    <BaseInput
      label="Название пиццы"
      placeholder="Введите название пиццы"
      name="pizza_name"
      v-model="pizzaName"
    />

    <div class="content__constructor">
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

    <BuilderPriceCounter />
  </div>
</template>

<script>
import BaseInput from "@/common/components/base/BaseInput";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "BuilderPizzaView",

  props: {
    drops: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    BaseInput,
    BuilderPriceCounter,
  },

  data() {
    return {
      pizzaName: "",
    };
  },
};
</script>

<style lang="scss" scoped></style>
