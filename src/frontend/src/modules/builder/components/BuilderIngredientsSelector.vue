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
            :radioValue="item.id"
            :checked="active === i"
            name="ingridients"
            labelType="radio"
            :inputVisuallyHidden="false"
            @input="selectSauce($event, i)"
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
                :imageClass="getImage(ingredient.name)"
                :name="ingredient.name"
                draggable
                @dragstart.native="startDrag($event, getImage(ingredient.name))"
              />

              <ItemCounter
                @input="setIngredient($event, ingredient)"
                class="ingridients__counter"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

import { eventBus } from "@/main.js";

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
      active: null,
      selectedSauce: null,
    };
  },

  computed: {
    ...mapState("Builder", ["sauces", "ingredients"]),
  },

  methods: {
    ...mapActions({ getItems: "Builder/query" }),

    ...mapMutations({
      setPizzaIngredient: "Builder/setPizzaIngredients",
    }),

    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("item", item);
    },

    getImage(name) {
      switch (name) {
        case "Грибы":
          return "mushrooms";
        case "Чеддер":
          return "cheddar";
        case "Салями":
          return "salami";
        case "Ветчина":
          return "ham";
        case "Ананас":
          return "ananas";
        case "Бекон":
          return "bacon";
        case "Лук":
          return "onion";
        case "Чили":
          return "chile";
        case "Халапеньо":
          return "jalapeno";
        case "Маслины":
          return "olives";
        case "Томаты":
          return "tomatoes";
        case "Лосось":
          return "salmon";
        case "Моцарелла":
          return "mozzarella";
        case "Пармезан":
          return "parmesan";
        case "Блю чиз":
          return "blue_cheese";
        default:
          return false;
      }
    },

    selectSauce(e, i) {
      this.active = i;
      this.$emit("setPizzaSauce", {
        ingredient: "sauceId",
        value: parseInt(e),
      });
    },

    setIngredient(e, ing) {
      const ingredient = {
        ingredientId: ing.id,
        quantity: e,
      };

      this.$emit("setPizzaIngredient", ingredient);

      eventBus.$emit("setIngredients", {
        name: this.getImage(ing.name),
        count: e,
      });
    },
  },

  async created() {
    await this.getItems("sauces");
    await this.getItems("ingredients");
  },
};
</script>

<style lang="scss" scoped></style>
