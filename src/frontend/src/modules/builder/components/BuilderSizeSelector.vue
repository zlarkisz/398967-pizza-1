<template>
  <div class="content__diameter">
    <div class="sheet">
      <BaseTitle>Выберите размер</BaseTitle>

      <div class="sheet__content diameter">
        <RadioButton
          v-for="(item, i) in sizes"
          :key="item.id"
          v-model="selectedSize"
          :itemName="item.name"
          :radioValue="item.multiplier"
          :checked="active === i"
          :size="getSize(item.multiplier)"
          name="diameter"
          @input="active = i"
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

  data() {
    return {
      active: null,
      selectedSize: null,
    };
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
  },

  async created() {
    await this.getSizes("sizes");
  },
};
</script>

<style lang="scss" scoped></style>
