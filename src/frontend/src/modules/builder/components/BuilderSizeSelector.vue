<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

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
          @change="changeSize"
        />
      </div>
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

  data() {
    return {
      selectedSize: null,
    };
  },

  methods: {
    changeSize(newSize) {
      this.selectedSize = newSize;
    },
  },
};
</script>

<style lang="scss" scoped></style>
