<template>
  <div class="cart__form">
    <div class="cart-form">
      <div class="cart-form_top">
        <BaseSelect
          class="cart-form__select"
          label="Получение заказа:"
          labelClass="cart-form__label"
          :options="dynamicOptions"
          @input="setReceiving"
        />

        <BaseInput
          name="tel"
          type="number"
          label="Контактный телефон:"
          placeholder="+7 999-999-99-99"
          bigLabel
          required
          :disabled="isDisabled"
          v-model="phone"
          @input="setPhone"
        />
      </div>

      <div v-if="order.address !== null" class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <BaseInput
            name="street"
            label="Улица*"
            required
            :disabled="isDisabled"
            v-model="street"
            @input="setStreet"
          />
        </div>

        <div class="cart-form__input cart-form__input--small">
          <BaseInput
            name="house"
            type="number"
            label="Дом*"
            required
            :disabled="isDisabled"
            v-model="house"
            @input="setHouse"
          />
        </div>

        <div class="cart-form__input cart-form__input--small">
          <BaseInput
            name="apartment"
            type="number"
            label="Квартира"
            required
            :disabled="isDisabled"
            v-model="flat"
            @input="setApartment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import BaseInput from "@/common/components/base/BaseInput";
import BaseSelect from "@/common/components/base/BaseSelect";

export default {
  name: "CartForm",

  components: {
    BaseInput,
    BaseSelect,
  },

  data() {
    return {
      phone: null,
      street: null,
      house: null,
      flat: null,
      defaultOptions: [
        { value: 1, text: "Заберу сам" },
        { value: 2, text: "Новый адрес" },
      ],
      isDisabled: false,
    };
  },

  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        if (to !== from) {
          this.setDefaultCartOptions(this.defaultOptions);
        }
      },
    },
  },

  computed: {
    ...mapState("Cart", ["options", "order"]),
    ...mapState("Auth", { isAuth: "isAuthenticated" }),
    ...mapState("Addresses", ["addresses"]),

    dynamicOptions() {
      const selectOptions = [...this.options];

      if (!this.isAuth) {
        return selectOptions.filter(
          (option) =>
            option.text === "Заберу сам" || option.text === "Новый адрес"
        );
      } else {
        return this.options;
      }
    },
  },

  methods: {
    ...mapMutations("Cart", [
      "setOrderReceiving",
      "setPhone",
      "setStreet",
      "setHouse",
      "setApartment",
      "setCartOption",
      "setDefaultCartOptions",
      "setOrderAddressNull",
    ]),
    ...mapActions("Addresses", { getAddresses: "query" }),

    setReceiving(e) {
      const name = this.options.find((el) => el.value === parseInt(e));

      if (name.value === 1) {
        this.setOrderAddressNull();
      } else if (name.value === 2) {
        this.isDisabled = false;
        this.setOrderReceiving(name.text);
      } else {
        this.isDisabled = true;

        this.setOrderReceiving(name.text);

        this.addresses.forEach((adr) => {
          if (adr.name === name.text) {
            this.phone = adr.comment;
            this.setPhone(adr.comment);
            this.street = adr.street;
            this.setStreet(adr.street);
            this.house = adr.building;
            this.setHouse(adr.building);
            this.flat = adr.flat;
            this.setApartment(adr.flat);
          } else {
            this.phone = "";
            this.street = "";
            this.house = "";
            this.flat = "";
          }
        });
      }
    },
  },

  created() {
    if (this.isAuth) {
      this.getAddresses().then(() => {
        this.addresses.forEach((adr) => {
          this.setCartOption({
            value: this.options.length + 1,
            text: adr.name,
          });
        });
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.cart-form_top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
