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
            <li
              v-for="(product, i) in cartList"
              :key="i"
              class="cart-list__item"
            >
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
                v-model="product.count"
                plusBtnTheme="orange"
                class="cart-list__counter"
              />

              <div class="cart-list__price">
                <b>{{ product.price }}</b>
              </div>

              <div class="cart-list__button">
                <button type="button" class="cart-list__edit">Изменить</button>
              </div>
            </li>
          </ul>

          <div class="cart__additional">
            <ul class="additional-list">
              <li
                v-for="(add, idx) in additionalList"
                :key="`additional-${idx}`"
                class="additional-list__item sheet"
              >
                <p class="additional-list__description">
                  <img :src="add.image" width="39" height="60" :alt="add.alt" />
                  <span>{{ add.description }}</span>
                </p>

                <div class="additional-list__wrapper">
                  <ItemCounter
                    v-model="add.count"
                    plusBtnTheme="orange"
                    class="additional-list__counter"
                  />

                  <div class="additional-list__price">
                    <b>{{ add.price }}</b>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="cart__form">
            <div class="cart-form">
              <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>

                <select name="test" class="select">
                  <option value="1">Заберу сам</option>
                  <option value="2">Новый адрес</option>
                  <option value="3">Дом</option>
                </select>
              </label>

              <BaseSelect
                v-model="orderReceiving"
                class="cart-form__select"
                label="Получение заказа:"
                labelClass="cart-form__label"
                :options="options"
              />

              <BaseInput
                v-model="contactPhone"
                name="tel"
                label="Контактный телефон:"
                placeholder="+7 999-999-99-99"
                bigLabel
              />

              <div class="cart-form__address">
                <span class="cart-form__label">Новый адрес:</span>

                <div class="cart-form__input">
                  <BaseInput v-model="street" name="street" label="Улица*" />
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <BaseInput v-model="house" name="house" label="Дом*" />
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <BaseInput
                    v-model="apartment"
                    name="apartment"
                    label="Квартира"
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
      orderReceiving: "",
      contactPhone: "",
      street: "",
      house: "",
      apartment: "",
      cartList: [
        {
          img: { src: require("@/assets/img/product.svg"), alt: "Капричоза" },
          title: "Капричоза",
          description: [
            "30 см, на тонком тесте",
            "Соус: томатный",
            "Начинка: грибы, лук, ветчина, пармезан, ананас",
          ],
          count: 1,
          price: "782 ₽",
        },
        {
          img: {
            src: require("@/assets/img/product.svg"),
            alt: "Любимая пицца",
          },
          title: "Любимая пицца",
          description: [
            "30 см, на тонком тесте",
            "Соус: томатный",
            "Начинка: грибы, лук, ветчина, пармезан, ананас, бекон, блючиз",
          ],
          count: 2,
          price: "782 ₽",
        },
      ],
      additionalList: [
        {
          image: require("@/assets/img/cola.svg"),
          alt: "Coca-Cola 0,5 литра",
          description: "Coca-Cola 0,5 литра",
          count: 2,
          price: "56 ₽",
        },
        {
          image: require("@/assets/img/sauce.svg"),
          alt: "Острый соус",
          description: "Острый соус",
          count: 2,
          price: "30 ₽",
        },
        {
          image: require("@/assets/img/potato.svg"),
          alt: "Картошка из печи",
          description: "Картошка из печи",
          count: 2,
          price: "56 ₽",
        },
      ],
      options: [
        { value: 1, text: "Заберу сам" },
        { value: 2, text: "Новый адрес" },
        { value: 3, text: "Дом" },
      ],
    };
  },

  methods: {
    submitOrder(v) {
      console.log(v);
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
