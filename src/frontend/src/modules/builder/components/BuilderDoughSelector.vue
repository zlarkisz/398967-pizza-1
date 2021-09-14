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
          @input="selectDough($event, i)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

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

    ...mapMutations({ setPizzaDough: "Builder/setPizzaOptions" }),

    getSize(name) {
      return name === "Тонкое" ? "light" : "large";
    },

    selectDough(e, i) {
      this.active = i;
      this.setPizzaDough({ ingredient: "doughId", value: parseInt(e) });
    },
  },

  async created() {
    await this.getDough("dough");
  },
};
</script>

<style lang="scss" scoped></style>
