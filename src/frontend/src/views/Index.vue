<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>

      <BuilderDoughSelector :dough="dough" />

      <BuilderSizeSelector :sizes="sizes" />

      <BuilderIngredientsSelector :sauces="sauces" :ingredients="ingredients" />

      <BuilderPizzaView :drops="drops" />
    </div>
  </form>
</template>

<script>
import pizza from "@/static/pizza.json";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

export default {
  name: "IndexHome",

  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },

  data() {
    return {
      sizes: pizza.sizes,
      dough: pizza.dough,
      sauces: pizza.sauces,
      ingredients: pizza.ingredients,
      drops: ["ananas", "bacon", "cheddar", "mushrooms"],
    };
  },
};
</script>

<style lang="scss" scoped></style>
