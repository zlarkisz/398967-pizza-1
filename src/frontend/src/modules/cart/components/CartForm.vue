<template>
  <div class="cart__form">
    <div class="cart-form">
      <BaseSelect
        class="cart-form__select"
        label="Получение заказа:"
        labelClass="cart-form__label"
        :options="options"
        @input="setReceiving"
      />

      <BaseInput
        name="tel"
        type="number"
        label="Контактный телефон:"
        placeholder="+7 999-999-99-99"
        bigLabel
        required
        @input="setPhone"
      />

      <div class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <BaseInput name="street" label="Улица*" required @input="setStreet" />
        </div>

        <div class="cart-form__input cart-form__input--small">
          <BaseInput
            name="house"
            type="number"
            label="Дом*"
            required
            @input="setHouse"
          />
        </div>

        <div class="cart-form__input cart-form__input--small">
          <BaseInput
            name="apartment"
            type="number"
            label="Квартира"
            required
            @input="setApartment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import BaseInput from "@/common/components/base/BaseInput";
import BaseSelect from "@/common/components/base/BaseSelect";

export default {
  name: "CartForm",

  components: {
    BaseInput,
    BaseSelect,
  },

  computed: {
    ...mapState("Cart", [
      "options",
      "apartment",
      "house",
      "phone",
      "receiving",
      "street",
    ]),
  },

  methods: {
    ...mapMutations("Cart", [
      "setOrderReceiving",
      "setPhone",
      "setStreet",
      "setHouse",
      "setApartment",
    ]),

    setReceiving(e) {
      const name = this.options.find((el) => el.value === parseInt(e));

      this.setOrderReceiving(name.text);
    },
  },
};
</script>

<style lang="scss" scoped></style>
