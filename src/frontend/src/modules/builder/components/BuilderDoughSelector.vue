<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <RadioButton
          v-for="(item, i) in dough"
          :key="i"
          v-model="selectedDough"
          :itemName="item.name"
          :radioValue="item.value"
          :checked="item.checked"
          :itemDescription="item.description"
          :size="item.value"
          name="dough"
          @change="changeDough"
        />
      </div>
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

  data() {
    return {
      selectedDough: null,
    };
  },

  methods: {
    changeDough(newDough) {
      this.selectedDough = newDough;
    },
  },
};
</script>

<style lang="scss" scoped></style>
