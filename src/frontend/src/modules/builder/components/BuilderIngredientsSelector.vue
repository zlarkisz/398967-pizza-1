<template>
  <div class="content__ingridients">
    <div class="sheet">
      <BaseTitle>Выберите ингридиенты</BaseTitle>

      <div class="sheet__content ingridients">
        <div class="ingridients__sauce">
          <p>Основной соус:</p>

          <RadioButton
            v-for="item in sauces"
            :key="item.id"
            :item-name="item.name"
            :radio-value="item.id"
            :checked="selectedSauce === item.id"
            name="ingridients"
            label-type="radio"
            :input-visually-hidden="false"
            @input="selectSauce"
          />
        </div>

        <div class="ingridients__filling">
          <p>Начинка:</p>

          <transition-group name="list"
                            tag="ul"
                            class="ingridients__list"
          >
            <li
              v-for="(ingredient, i) in ingredients"
              :key="`ingredient-${i}`"
              class="ingridients__item"
            >
              <SelectorItem
                :image-class="getImage(ingredient.name)"
                :name="ingredient.name"
                draggable
                @dragstart.native="startDrag($event, ingredient.id)"
              />

              <ItemCounter
                :value="getIngredientCount(ingredient.id)"
                class="ingridients__counter"
                @input="setIngredient($event, ingredient)"
              />
            </li>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

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

  props: {
    ingredientsCounts: {
      type: Array,
      required: true,
    },

    selectedSauce: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapState("Builder", ["sauces", "ingredients"]),
  },

  async created() {
    await this.getItems("sauces");
    await this.getItems("ingredients");
  },

  methods: {
    ...mapActions({ getItems: "Builder/query" }),

    startDrag(evt, id) {
      const currentIngredient =
        this.ingredientsCounts.find((ingr) => ingr.ingredientId === id) || null;
      const defaultIngredient = { ingredientId: id, quantity: 1 };
      const draggedIngredient =
        currentIngredient && currentIngredient.quantity + 1 !== 4
          ? { ingredientId: id, quantity: currentIngredient.quantity + 1 }
          : currentIngredient && currentIngredient.quantity + 1 === 4
          ? { ingredientId: id, quantity: 3 }
          : defaultIngredient;

      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData(
        "ingredientId",
        JSON.stringify(draggedIngredient)
      );
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

    selectSauce(e) {
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

      this.$emit("setViewIngredients", {
        name: this.getImage(ing.name),
        count: e,
      });
    },

    getIngredientCount(id) {
      return (
        this.ingredientsCounts.find((el) => el.ingredientId === id)?.quantity ||
        0
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/transitions";
@import "~@/assets/scss/blocks/ingridients";
</style>
