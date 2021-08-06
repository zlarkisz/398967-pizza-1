<template>
  <div class="content__diameter">
    <div class="sheet">
      <BaseTitle>Выберите размер</BaseTitle>

      <div class="sheet__content diameter">
        <RadioButton
          v-for="(item, i) in sizes"
          :key="i"
          v-model="selectedSize"
          :itemName="item.name"
          :radioValue="item.value"
          :checked="item.checked"
          :size="item.value"
          name="diameter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
      selectedSize: null,
    };
  },

  computed: {
    ...mapState("Builder", ["sizes"]),
  },
};
</script>

<style lang="scss" scoped></style>
