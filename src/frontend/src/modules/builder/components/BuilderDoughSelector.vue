<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <RadioButton
        :items="dough"
        name="dough"
        size="light"
        checked
        class="sheet__content dough"
      />
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderDoughSelector",

  props: {
    dough: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    RadioButton,
  },
};
</script>

<style lang="scss" scoped></style>
