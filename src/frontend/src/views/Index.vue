<template>
  <form action="#" method="post">
    <div v-if="$route.name !== 'Login'" class="content__wrapper">
      <BaseTitle :level="1" size="big" :sheet="false">
        Конструктор пиццы
      </BaseTitle>

      <BuilderDoughSelector />

      <BuilderSizeSelector />

      <BuilderIngredientsSelector />

      <BuilderPizzaView />
    </div>

    <router-view />
  </form>
</template>

<script>
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
};
</script>

<style lang="scss" scoped></style>
