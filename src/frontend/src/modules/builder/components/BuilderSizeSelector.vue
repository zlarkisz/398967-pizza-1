<template>
  <div class="content__diameter">
    <div class="sheet">
      <BaseTitle>Выберите размер</BaseTitle>

      <div class="sheet__content diameter">
        <RadioButton
          v-for="item in sizes"
          :key="item.id"
          :item-name="item.name"
          :radio-value="item.multiplier"
          :checked="selectedSize === item.id"
          :size="getSize(item.multiplier)"
          name="diameter"
          @input="selectSize"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import BaseTitle from "@/common/components/base/BaseTitle";
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",

  components: {
    BaseTitle,
    RadioButton,
  },

  props: {
    selectedSize: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapState("Builder", ["sizes"]),
  },

  methods: {
    ...mapActions({ getSizes: "Builder/query" }),

    getSize(size) {
      switch (size) {
        case 1:
          return "small";
        case 2:
          return "normal";
        case 3:
          return "big";
        default:
          return false;
      }
    },

    selectSize(e) {
      this.$emit("setPizzaSize", { ingredient: "sizeId", value: parseInt(e) });
    },
  },

  async created() {
    await this.getSizes("sizes");
  },
};
</script>

<style lang="scss" scoped></style>
