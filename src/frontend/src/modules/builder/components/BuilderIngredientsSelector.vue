<template>
  <div class="content__ingridients">
    <div class="sheet">
      <BaseTitle>Выберите ингридиенты</BaseTitle>

      <div class="sheet__content ingridients">
        <div class="ingridients__sauce">
          <p>Основной соус:</p>

          <RadioButton
            v-for="(item, i) in sauces"
            :key="i"
            v-model="selectedSauce"
            :itemName="item.name"
            :radioValue="item.value"
            :checked="item.checked"
            name="ingridients"
            labelType="radio"
            :inputVisuallyHidden="false"
          />
        </div>

        <div class="ingridients__filling">
          <p>Начинка:</p>

          <ul class="ingridients__list">
            <li
              v-for="(ingredient, i) in ingredients"
              :key="`ingredient-${i}`"
              class="ingridients__item"
            >
              <SelectorItem
                :imageClass="ingredient.label"
                :name="ingredient.name"
                draggable
                @dragstart.native="startDrag($event, ingredient.label)"
              />

              <ItemCounter class="ingridients__counter" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import BaseTitle from "@/common/components/base/BaseTitle";
import RadioButton from "@/common/components/RadioButton";
import ItemCounter from "@/common/components/ItemCounter";
import SelectorItem from "@/common/components/SelectorItem";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    BaseTitle,
    RadioButton,
    ItemCounter,
    SelectorItem,
  },

  data() {
    return {
      selectedSauce: null,
    };
  },

  computed: {
    ...mapState("Builder", ["sauces", "ingredients"]),
  },

  methods: {
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("item", item);
    },
  },
};
</script>

<style lang="scss" scoped></style>
