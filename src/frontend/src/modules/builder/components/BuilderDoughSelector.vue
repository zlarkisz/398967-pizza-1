<template>
  <div class="content__dough">
    <div class="sheet">
      <BaseTitle>Выберите тесто</BaseTitle>

      <div class="sheet__content dough">
        <RadioButton
          v-for="(item, i) in dough"
          :key="item.id"
          v-model="selectedDough"
          :itemName="item.name"
          :radioValue="item.id"
          :checked="active === i"
          :itemDescription="item.description"
          :size="getSize(item.name)"
          name="dough"
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
  name: "BuilderDoughSelector",

  components: {
    BaseTitle,
    RadioButton,
  },

  data() {
    return {
      active: null,
      selectedDough: null,
    };
  },

  computed: {
    ...mapState("Builder", ["dough"]),
  },

  methods: {
    ...mapActions({ getDough: "Builder/query" }),

    getSize(name) {
      return name === "Тонкое" ? "light" : "large";
    },
  },

  async created() {
    await this.getDough("dough");
  },
};
</script>

<style lang="scss" scoped></style>
