<template>
  <div>
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

          <div class="cart__additional">
            <ul class="additional-list">
              <li
                v-for="(add, idx) in additions"
                :key="`additional-${idx}`"
                class="additional-list__item sheet"
              >
                <p class="additional-list__description">
                  <img :src="add.image" width="39" height="60" :alt="add.alt" />
                  <span>{{ add.name }}</span>
                </p>

                <div class="additional-list__wrapper">
                  <ItemCounter
                    :value="add.count"
                    plusBtnTheme="orange"
                    class="additional-list__counter"
                    @input="onChangeAmount($event, idx, 'additions')"
                  />

                  <div class="additional-list__price">
                    <b>{{ add.price }} ₽</b>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="cart__form">
            <div class="cart-form">
              <BaseSelect
                class="cart-form__select"
                label="Получение заказа:"
                labelClass="cart-form__label"
                :options="options"
                @input="setOrderReceiving"
              />

              <BaseInput
                name="tel"
                label="Контактный телефон:"
                placeholder="+7 999-999-99-99"
                bigLabel
                @input="setPhone"
              />

              <div class="cart-form__address">
                <span class="cart-form__label">Новый адрес:</span>

                <div class="cart-form__input">
                  <BaseInput name="street" label="Улица*" @input="setStreet" />
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <BaseInput name="house" label="Дом*" @input="setHouse" />
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <BaseInput
                    name="apartment"
                    label="Квартира"
                    @input="setApartment"
                  />
                </div>
              </div>
            </div>
          </div>
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
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import BaseTitle from "@/common/components/base/BaseTitle";
import BaseInput from "@/common/components/base/BaseInput";
import BaseSelect from "@/common/components/base/BaseSelect";
import ItemCounter from "@/common/components/ItemCounter";

import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "Cart",

  components: {
    BaseTitle,
    BaseInput,
    BaseSelect,
    ItemCounter,
    BuilderPriceCounter,
  },

  data() {
    return {
      pricesSum: 0,
    };
  },

  computed: {
    ...mapState("Cart", ["additions", "cart", "options"]),
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

    ...mapMutations(["setOrderStatus"]),

    submitOrder() {
      this.setOrderStatus(true);
    },

    onChangeAmount(count, cartIndex, cartList) {
      this.changeAmount({ cartIndex, count, cartList });
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
