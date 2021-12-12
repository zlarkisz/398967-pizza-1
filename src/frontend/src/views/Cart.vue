<template>
  <form class="layout-form" @submit.prevent>
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <BaseTitle :level="1" size="big">Корзина</BaseTitle>
        </div>

        <div v-if="!order.pizzas.length" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul v-else class="cart-list sheet">
          <li
            v-for="(pizza, i) in order.pizzas"
            :key="i"
            class="cart-list__item"
          >
            <div class="product cart-list__product">
              <img
                src="@/assets/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                alt="pizza"
              />
              <div v-if="pizza.name" class="product__text">
                <h2>{{ pizza.name }}</h2>
                <ul>
                  <li>
                    {{ getStuffing(pizza.sizeId, "size") }}
                    {{ getStuffing(pizza.doughId, "dough") }}
                  </li>
                  <li>Соус: {{ getStuffing(pizza.sauceId, "sauce") }}</li>
                  <li>
                    Начинка:
                    <span
                      v-for="item in pizza.ingredients"
                      :key="item.ingredientId"
                    >
                      {{ getStuffing(item.ingredientId, "ingredient") }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <ItemCounter
              :value="pizza.quantity"
              plusBtnTheme="orange"
              class="cart-list__counter"
              @input="setQuantity($event, i)"
            />

            <div class="cart-list__price">
              <b>{{ pizza.price }} ₽</b>
            </div>

            <div class="cart-list__button">
              <button
                @click="$router.push('/')"
                type="button"
                class="cart-list__edit"
              >
                Изменить
              </button>
            </div>
          </li>
        </ul>

        <CartAdditional />

        <CartForm />
      </div>
    </main>

    <section class="footer">
      <div class="footer__more">
        <router-link to="/" class="button button--border button--arrow">
          Хочу еще одну
        </router-link>
      </div>

      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>

      <BuilderPriceCounter
        buttonText="Оформить заказ"
        :isDisabled="isNewAddress || !order.pizzas.length"
        @makePizza="submitOrder"
        class="footer__price"
      />
    </section>
  </form>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";

import BaseTitle from "@/common/components/base/BaseTitle";
import ItemCounter from "@/common/components/ItemCounter";
import CartAdditional from "@/modules/cart/components/CartAdditional";
import CartForm from "@/modules/cart/components/CartForm";

import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "Cart",

  layout: "AppLayoutDefault",

  components: {
    BaseTitle,
    ItemCounter,
    BuilderPriceCounter,
    CartAdditional,
    CartForm,
  },

  data() {
    return {
      pricesSum: 0,
    };
  },

  computed: {
    ...mapState("Builder", ["dough", "sizes", "sauces", "ingredients"]),
    ...mapState("Cart", ["order", "misc"]),
    ...mapState("Auth", ["user"]),

    isNewAddress() {
      const address = this.order.address;

      if (!address.street.length) {
        return true;
      } else if (!address.building.length) {
        return true;
      } else if (!address.comment.length) {
        return true;
      } else if (!address.flat.length) {
        return true;
      } else {
        return false;
      }
    },
  },

  mounted() {
    if (this.user) this.setUserId(this.user.id);
  },

  methods: {
    ...mapMutations("Cart", [
      "setPizzaQuantity",
      "deletePizza",
      "setUserId",
      "setOrderMisc",
      "setOrderPizzas",
    ]),

    ...mapActions("Cart", ["sendAnOrder"]),

    async submitOrder() {
      const finalMiscs = this.misc.filter((m) => m.count !== 0);
      const orderMisc = finalMiscs.map((el) => {
        return { miscId: el.id, quantity: el.count };
      });
      let finalPizzas = [];
      console.log(JSON.stringify(this.order.pizzas));

      this.order.pizzas.forEach((p) => {
        let pizza = { ...p };
        delete pizza.price;
        finalPizzas.push(pizza);
      });

      this.setOrderMisc(orderMisc);
      this.setOrderPizzas(finalPizzas);

      await this.sendAnOrder(this.order);
    },

    setQuantity(e, i) {
      if (!e) {
        this.deletePizza(i);
      } else {
        this.setPizzaQuantity({ quantity: e, idx: i });
      }
    },

    getStuffing(id, name) {
      let arr;

      switch (name) {
        case "size":
          arr = this.sizes;
          break;
        case "dough":
          arr = this.dough;
          break;
        case "sauce":
          arr = this.sauces;
          break;
        case "ingredient":
          arr = this.ingredients;
          break;

        default:
          break;
      }

      const stuff = arr.find((el) => el.id === id);

      return stuff.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  &__price {
    margin: 0 0 0 auto;
  }
}
</style>
