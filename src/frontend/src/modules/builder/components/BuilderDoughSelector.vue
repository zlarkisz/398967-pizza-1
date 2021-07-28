<template>
  <div class="content__dough">
    <div class="sheet">
      <BaseTitle>Выберите тесто</BaseTitle>

      <div class="sheet__content dough">
        <RadioButton
          v-for="(item, i) in doughList"
          :key="i"
          v-model="selectedDough"
          :itemName="item.name"
          :radioValue="item.value"
          :checked="item.checked"
          :itemDescription="item.description"
          :size="item.value"
          name="dough"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
      selectedDough: null,
    };
  },

  computed: {
    ...mapGetters("Builder", ["doughList"]),
  },
};
</script>

<style lang="scss" scoped></style>
