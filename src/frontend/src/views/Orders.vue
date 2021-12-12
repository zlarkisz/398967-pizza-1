<template>
  <div class="layout__content">
    <AppLayoutSidebar />
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>
    <template v-if="orders.length">
      <section v-for="order in orders" :key="order.id" class="sheet order">
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #{{ order.id }}</b>
          </div>

          <div class="order__sum">
            <span>Сумма заказа: {{ order.price }} ₽</span>
          </div>

          <div class="order__button">
            <button
              type="button"
              class="button button--border"
              @click="deleteOrder(order.id)"
            >
              Удалить
            </button>
          </div>
          <div class="order__button">
            <button type="button" class="button" @click="submitOrder(order)">
              Повторить
            </button>
          </div>
        </div>

        <ul class="order__list">
          <li
            v-for="(pizza, i) in order.orderPizzas"
            :key="`pizza-${i}`"
            class="order__item"
          >
            <div class="product">
              <img
                src="@/assets/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                alt="Капричоза"
              />
              <div class="product__text">
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
                      :key="`ingredientId-${item.ingredientId}`"
                    >
                      {{ getStuffing(item.ingredientId, "ingredient") }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <p class="order__price">{{ orderPizzaPrice(pizza) }} ₽</p>
          </li>
        </ul>

        <ul class="order__additional">
          <li v-for="misc in order.orderMisc" :key="`misk-${misc.id}`">
            <img
              :src="setMisc(misc.miscId, image)"
              width="20"
              height="30"
              alt="Coca-Cola 0,5 литра"
            />
            <p>
              <span>{{ setMisc(misc.miscId, name) }}</span>
              <b>{{ setMisc(misc.miscId, price, misc.quantity) }} ₽</b>
            </p>
          </li>
        </ul>

        <p class="order__address">
          {{ order.orderAddress.street }}, д.{{ order.orderAddress.building }},
          оф.{{ order.orderAddress.flat }}

          <small>Comment: {{ order.orderAddress.comment }}</small>
        </p>
      </section>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import AppLayoutSidebar from "@/layouts/AppLayoutSidebar";

export default {
  name: "Orders",

  layout: "AppLayoutDefault",

  components: {
    AppLayoutSidebar,
  },

  data() {
    return {
      image: "image",
      name: "name",
      price: "price",
      ordersPrices: [],
    };
  },

  computed: {
    ...mapState("Orders", ["orders"]),
    ...mapState("Builder", ["dough", "sizes", "sauces", "ingredients"]),
    ...mapState("Cart", ["misc"]),
  },

  methods: {
    ...mapActions({ getOrders: "Orders/query" }),
    ...mapActions({ delOrder: "Orders/delete" }),
    ...mapActions({ getItems: "Builder/query" }),
    ...mapActions({ getMisc: "Cart/query" }),
    ...mapActions("Cart", ["sendAnOrder"]),
    ...mapMutations({
      setOrder: "Cart/setOrder",
      setCartMisc: "Cart/setCartMisc",
    }),

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

    setMisc(id, type, quantity) {
      if (type === "price") {
        let miscPrice;
        this.misc.forEach((misc) => {
          if (misc.id === id) {
            miscPrice = misc.price;
          }
        });
        return quantity * miscPrice;
      } else {
        const searchedMisc = this.misc.find((misc) => misc.id === id);
        return searchedMisc?.[type];
      }
    },

    async deleteOrder(id) {
      await this.delOrder(id);
    },

    async submitOrder(order) {
      let finalOrder = {
        userId: order.userId,
        pizzas: [],
        misc: [],
        address: {
          name: order.orderAddress.name,
          street: order.orderAddress.street,
          building: order.orderAddress.building,
          flat: order.orderAddress.flat,
          comment: order.orderAddress.comment,
        },
      };
      let repeatedMiscs = [];

      order.orderPizzas.forEach((pizza) => {
        let finalIngr = [];

        pizza.ingredients.forEach((ing) => {
          let mutateIng = {
            ingredientId: ing.ingredientId,
            quantity: ing.quantity,
          };
          finalIngr.push(mutateIng);
        });

        let newPizza = {
          name: pizza.name,
          sauceId: pizza.sauceId,
          doughId: pizza.doughId,
          sizeId: pizza.sizeId,
          quantity: pizza.quantity,
          ingredients: finalIngr,
        };

        newPizza.price = this.orderPizzaPrice(newPizza);
        finalOrder.pizzas.push(newPizza);
      });

      order.orderMisc.forEach((misc) => {
        let finalMisc = {
          miscId: misc.miscId,
          quantity: misc.quantity,
        };

        repeatedMiscs.push(finalMisc);
      });

      this.setCartMisc(repeatedMiscs);
      this.setOrder(finalOrder);
      this.$router.push("/cart");
    },

    async loadDefaultData() {
      await this.getItems("dough");
      await this.getItems("sizes");
      await this.getItems("sauces");
      await this.getItems("ingredients");
    },

    orderPizzaPrice(pizza) {
      let pizzaPrice = 0;
      let ingredientsPrice = 0;
      const doughPrice = this.dough.find((d) => d.id === pizza.doughId).price;
      const saucePrice = this.sauces.find((s) => s.id === pizza.sauceId).price;

      this.ingredients.forEach((ingr) => {
        pizza.ingredients.forEach((pIng) => {
          if (pIng.ingredientId === ingr.id) {
            ingredientsPrice += ingr.price;
          }
        });
      });

      pizzaPrice =
        (doughPrice + saucePrice + ingredientsPrice) * pizza.quantity;

      return pizzaPrice;
    },

    setOrdersCount() {
      this.orders.forEach((order) => {
        let orderWithPrice = {};
        orderWithPrice.id = order.id;
        orderWithPrice.price = 0;
        this.ordersPrices.push(orderWithPrice);
      });

      this.orders.forEach((or) => {
        or.orderPizzas.forEach((pizza) => {
          let pizzaPrice = 0;
          let ingredientsPrice = 0;
          const doughPrice = this.dough.find(
            (d) => d.id === pizza.doughId
          ).price;
          const saucePrice = this.sauces.find(
            (s) => s.id === pizza.sauceId
          ).price;

          this.ingredients.forEach((ingr) => {
            pizza.ingredients.forEach((pIng) => {
              if (pIng.id === ingr.id) {
                ingredientsPrice += ingr.price;
              }
            });
          });

          pizzaPrice =
            (doughPrice + saucePrice + ingredientsPrice) * pizza.quantity;

          this.ordersPrices.forEach((orPr) => {
            if (orPr.id === or.id) {
              orPr.price += pizzaPrice;
            }
          });
        });
      });
    },
  },

  async created() {
    await this.loadDefaultData();
    await this.getMisc("misc");
    await this.getOrders();
    this.setOrdersCount();
  },
};
</script>

<style lang="scss" scoped></style>
