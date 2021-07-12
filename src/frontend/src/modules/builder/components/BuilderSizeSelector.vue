<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <RadioButton
        :items="sizes"
        name="diameter"
        size="small"
        class="sheet__content diameter"
      />
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",

  props: {
    sizes: {
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
