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
        @setViewIngredients="setViewIngredients"
      />

      <div class="pizza-view">
        <BuilderPizzaView
          @setPizzaName="setPizzaOptions"
          :pizzaViewIngredients="pizzaViewIngredients"
        />

        <BuilderPriceCounter
          pizzaAmount
          :pizzaPrice="pizzaPrice"
          @makePizza="makePizza"
          buttonText="Готовьте!"
          :isDisabled="!isPizzaisFull"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import BaseTitle from "@/common/components/base/BaseTitle";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "IndexHome",

  layout: "AppLayoutMain",

  components: {
    BaseTitle,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  data() {
    return {
      pizza: {
        name: "",
        sauceId: 1,
        doughId: 1,
        sizeId: 1,
        quantity: 1,
        ingredients: [],
        price: 0,
      },
      pizzaPrice: 0,
      pizzaViewIngredients: {},
    };
  },

  watch: {
    pizza: {
      deep: true,
      immediate: true,
      handler(v) {
        if (v) {
          v.price =
            (this.doughAmount + this.sauceAmount + this.ingredientsAmount) *
            this.priceModificator;
          this.pizzaPrice = v.price;
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

    priceModificator() {
      const size = this.sizes.find((el) => {
        return el.id === this.pizza.sizeId;
      });

      return size?.multiplier || 1;
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

    setViewIngredients(viewIngregients) {
      this.pizzaViewIngredients = viewIngregients;
    },

    makePizza() {
      this.setPizza(this.pizza);
      this.$router.push("/cart");
    },
  },
};
</script>

<style lang="scss" scoped>
.pizza-view {
  display: flex;
  flex-direction: column;
}
</style>
