<template>
  <div class="cart__form">
    <div class="cart-form">
      <BaseSelect
        class="cart-form__select"
        label="Получение заказа:"
        labelClass="cart-form__label"
        :options="options"
        @input="$emit('setReceiving', $event)"
      />

      <BaseInput
        name="tel"
        type="number"
        label="Контактный телефон:"
        placeholder="+7 999-999-99-99"
        bigLabel
        @input="$emit('setPhone', $event)"
      />

      <div class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <BaseInput
            name="street"
            label="Улица*"
            @input="$emit('setStreet', $event)"
          />
        </div>

        <div class="cart-form__input cart-form__input--small">
          <BaseInput
            name="house"
            type="number"
            label="Дом*"
            @input="$emit('setHouse', $event)"
          />
        </div>

        <div class="cart-form__input cart-form__input--small">
          <BaseInput
            name="apartment"
            type="number"
            label="Квартира"
            @input="$emit('setApartment', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import BaseInput from "@/common/components/base/BaseInput";
import BaseSelect from "@/common/components/base/BaseSelect";

export default {
  name: "CartForm",

  components: {
    BaseInput,
    BaseSelect,
  },

  computed: {
    ...mapState("Cart", ["options"]),
  },
};
</script>

<style lang="scss" scoped></style>
