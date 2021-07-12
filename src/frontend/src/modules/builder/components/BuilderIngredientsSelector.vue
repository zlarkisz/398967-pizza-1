<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>

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
            @change="changeSauce"
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
                :imageClass="ingredient.class"
                :name="ingredient.name"
              />

              <ItemCounter />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import ItemCounter from "@/common/components/ItemCounter";
import SelectorItem from "@/common/components/SelectorItem";

export default {
  name: "BuilderIngredientsSelector",

  props: {
    sauces: {
      type: Array,
      default: () => [],
    },

    ingredients: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    RadioButton,
    ItemCounter,
    SelectorItem,
  },

  data() {
    return {
      selectedSauce: null,
    };
  },

  methods: {
    changeSauce(newcSauce) {
      this.selectedSauce = newcSauce;
    },
  },
};
</script>

<style lang="scss" scoped></style>
