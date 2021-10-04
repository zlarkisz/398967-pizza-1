<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <BaseTitle :level="1" size="big" :sheet="false">
        Конструктор пиццы
      </BaseTitle>

      <BuilderDoughSelector @setPizzaDough="setPizzaOptions" />

      <BuilderSizeSelector @setPizzaSize="setPizzaOptions" />

      <BuilderIngredientsSelector
        @setPizzaSauce="setPizzaOptions"
        @setPizzaIngredient="setPizzaIngredients"
      />

      <BuilderPizzaView
        @setPizzaName="setPizzaOptions"
        @makePizza="makePizza"
        :isDisabled="!isPizzaisFull"
      />
    </div>
  </form>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import { eventBus } from "@/main.js";

import BaseTitle from "@/common/components/base/BaseTitle";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

export default {
  name: "IndexHome",

  components: {
    BaseTitle,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },

  data() {
    return {
      pizza: {
        name: "",
        sauceId: 0,
        doughId: 0,
        sizeId: 0,
        quantity: 1,
        ingredients: [],
        price: 0,
      },
    };
  },

  watch: {
    pizza: {
      deep: true,
      immediate: true,
      handler(v) {
        if (v) {
          v.price =
            this.doughAmount + this.sauceAmount + this.ingredientsAmount;
          eventBus.$emit("setPizzaPrice", { price: v.price });
        }
      },
    },
  },

  computed: {
    ...mapState("Builder", ["dough", "sizes", "sauces", "ingredients"]),

    doughAmount() {
      const doughtPrice = this.dough.find((el) => el.id === this.pizza.doughId);

      return doughtPrice?.price || 0;
    },

    sauceAmount() {
      const saucePrice = this.sauces.find((el) => el.id === this.pizza.sauceId);

      return saucePrice?.price || 0;
    },

    ingredientsAmount() {
      return this.pizza.ingredients.reduce((acc, el) => {
        this.ingredients.forEach((ing) => {
          if (ing.id === el.ingredientId) {
            let currentIng = el;

            acc += currentIng.quantity * ing.price;
          }
        });

        return acc;
      }, 0);
    },

    isPizzaisFull() {
      const isElementFull = (e) => !!e;

      return Object.values(this.pizza).every(isElementFull);
    },
  },

  methods: {
    ...mapMutations({ setPizza: "Cart/setPizza" }),

    setPizzaOptions({ ingredient, value }) {
      this.pizza[ingredient] = value;
    },

    setPizzaIngredients(ingredient) {
      if (ingredient.quantity === 0) {
        this.pizza.ingredients = this.pizza.ingredients.filter(
          (el) => el.ingredientId !== ingredient.ingredientId
        );
      } else if (this.pizza.ingredients.length) {
        if (
          this.pizza.ingredients.some(
            (el) => el.ingredientId === ingredient.ingredientId
          )
        ) {
          this.pizza.ingredients.forEach((el) => {
            if (el.ingredientId === ingredient.ingredientId) {
              el.quantity = ingredient.quantity;
            }
          });
        } else {
          this.pizza.ingredients.push(ingredient);
        }
      } else {
        this.pizza.ingredients.push(ingredient);
      }
    },

    makePizza() {
      this.setPizza(this.pizza);
      this.$router.push("/cart");
    },
  },
};
</script>

<style lang="scss" scoped></style>
