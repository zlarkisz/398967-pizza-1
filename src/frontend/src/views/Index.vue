<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <BaseTitle size="big" :sheet="false">Конструктор пиццы</BaseTitle>

      <BuilderDoughSelector :dough="dough" />

      <BuilderSizeSelector :sizes="sizes" />

      <BuilderIngredientsSelector :sauces="sauces" :ingredients="ingredients" />

      <BuilderPizzaView />
    </div>
  </form>
</template>

<script>
import pizza from "@/static/pizza.json";
import BaseTitle from "@/common/components/base/BaseTitle";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

export default {
  name: "IndexHome",

  components: {
    BaseTitle,
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
    };
  },
};
</script>

<style lang="scss" scoped></style>
