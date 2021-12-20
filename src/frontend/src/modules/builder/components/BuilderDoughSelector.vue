<template>
  <div class="content__dough">
    <div class="sheet">
      <BaseTitle>Выберите тесто</BaseTitle>

      <div class="sheet__content dough">
        <RadioButton
          v-for="item in dough"
          :key="item.id"
          :item-name="item.name"
          :radio-value="item.id"
          :checked="selectedDough === item.id"
          :item-description="item.description"
          :size="getSize(item.name)"
          name="dough"
          @input="selectDough"
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
  name: "BuilderDoughSelector",

  components: {
    BaseTitle,
    RadioButton,
  },

  props: {
    selectedDough: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapState("Builder", ["dough"]),
  },

  async created() {
    await this.getDough("dough");
  },

  methods: {
    ...mapActions({ getDough: "Builder/query" }),

    getSize(name) {
      return name === "Тонкое" ? "light" : "large";
    },

    selectDough(e) {
      this.$emit("setPizzaDough", {
        ingredient: "doughId",
        value: parseInt(e),
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
