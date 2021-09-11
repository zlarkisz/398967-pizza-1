<template>
  <form class="layout-form" @submit.prevent>
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <BaseTitle :level="1" size="big">Корзина</BaseTitle>
        </div>

        <!-- <div class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div> -->

        <ul class="cart-list sheet">
          <li v-for="(product, i) in cart" :key="i" class="cart-list__item">
            <div class="product cart-list__product">
              <img
                :key="product.img.alt"
                :src="product.img.src"
                class="product__img"
                width="56"
                height="56"
                :alt="product.img.alt"
              />
              <div class="product__text">
                <h2>{{ product.title }}</h2>
                <ul>
                  <li
                    v-for="(desc, idx) in product.description"
                    :key="`product-${idx}`"
                  >
                    {{ desc }}
                  </li>
                </ul>
              </div>
            </div>

            <ItemCounter
              :value="product.count"
              plusBtnTheme="orange"
              class="cart-list__counter"
              @input="onChangeAmount($event, i, 'cart')"
            />

            <div class="cart-list__price">
              <b>{{ product.price }} ₽</b>
            </div>

            <div class="cart-list__button">
              <button type="button" class="cart-list__edit">Изменить</button>
            </div>
          </li>
        </ul>

        <CartAdditional @changeAmount="onChangeAmount" />

        <CartForm
          @setReceiving="setOrderReceiving"
          @setPhone="setPhone"
          @setStreet="setStreet"
          @setHouse="setHouse"
          @setApartment="setApartment"
        />
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
        @submit="submitOrder"
        class="footer__price"
      />
    </section>
  </form>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import BaseTitle from "@/common/components/base/BaseTitle";
import ItemCounter from "@/common/components/ItemCounter";
import CartAdditional from "@/modules/cart/components/CartAdditional";
import CartForm from "@/modules/cart/components/CartForm";

import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "Cart",

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
    ...mapState("Cart", ["misc", "cart", "options"]),
  },

  methods: {
    ...mapMutations("Cart", [
      "setOrderReceiving",
      "setPhone",
      "setStreet",
      "setHouse",
      "setApartment",
      "changeAmount",
    ]),

    ...mapMutations(["SET_ORDER_STATUS"]),

    submitOrder() {
      this.SET_ORDER_STATUS(true);
    },

    onChangeAmount({ count, id, list }) {
      this.changeAmount({ id, count, list });
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
