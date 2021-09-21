<template>
  <div class="layout__content">
    <div class="layout__title">
      <BaseTitle :level="1" size="big">Мои данные</BaseTitle>
    </div>

    <div class="user">
      <picture>
        <source
          type="image/webp"
          srcset="
            @/assets/img/users/user5@2x.webp 1x,
            @/assets/img/users/user5@4x.webp 2x
          "
        />
        <img
          src="@/assets/img/users/user5@2x.jpg"
          srcset="@/assets/img/users/user5@4x.jpg"
          alt="Василий Ложкин"
          width="72"
          height="72"
        />
      </picture>
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ user.phone }}</span>
      </p>
    </div>

    <div class="layout__address">
      <div
        v-for="address in addresses"
        :key="address.id"
        class="sheet address-form"
      >
        <div class="address-form__header">
          <b>Адрес №{{ address.id }}. {{ address.name }}</b>
          <div class="address-form__edit">
            <button type="button" class="icon">
              <span class="visually-hidden">Изменить адрес</span>
            </button>
          </div>
        </div>
        <p>
          {{ address.street }}, д. {{ address.building }}, оф.
          {{ address.flat }}
        </p>
        <small>{{ address.comment }}</small>
      </div>
    </div>

    <div class="layout__address">
      <form
        @submit.prevent
        method="post"
        class="address-form address-form--opened sheet"
      >
        <div class="address-form__header">
          <b>Адрес №{{ addresses.length + 1 }}</b>
        </div>

        <div class="address-form__wrapper">
          <div class="address-form__input">
            <BaseInput
              label="Название адреса*"
              placeholder="Введите название адреса"
              name="addr-name"
              required
              v-model="address.name"
            />
          </div>

          <div class="address-form__input address-form__input--size--normal">
            <BaseInput
              label="Улица*"
              placeholder="Введите название улицы"
              name="addr-street"
              required
              v-model="address.street"
            />
          </div>

          <div class="address-form__input address-form__input--size--small">
            <BaseInput
              type="number"
              label="Дом*"
              placeholder="Введите номер дома"
              name="addr-house"
              required
              v-model="address.building"
            />
          </div>

          <div class="address-form__input address-form__input--size--small">
            <BaseInput
              type="number"
              label="Квартира"
              placeholder="Введите № квартиры"
              name="addr-apartment"
              v-model="address.flat"
            />
          </div>

          <div class="address-form__input">
            <BaseInput
              type="text"
              label="Комментарий"
              placeholder="Введите комментарий"
              name="addr-comment"
              v-model="address.comment"
            />
          </div>
        </div>

        <div class="address-form__buttons">
          <button type="button" class="button button--transparent">
            Удалить
          </button>
          <button type="submit" class="button" @click="sendAddress">
            Сохранить
          </button>
        </div>
      </form>
    </div>

    <div class="layout__button">
      <button type="button" class="button button--border">
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import BaseTitle from "@/common/components/base/BaseTitle";
import BaseInput from "@/common/components/base/BaseInput";

export default {
  name: "Profile",

  components: {
    BaseTitle,
    BaseInput,
  },

  data() {
    return {
      address: {
        name: "",
        userId: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      },
    };
  },

  methods: {
    ...mapActions("Addresses", ["query", "post"]),

    setAddressUserId() {
      this.address.userId = this.user.id;
    },

    clearCurrentAddress() {
      for (let key in this.address) {
        this.address[key] = "";
      }
    },

    async sendAddress() {
      this.setAddressUserId();
      await this.post(this.address);
      this.clearCurrentAddress();
    },
  },

  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Addresses", ["addresses"]),
  },

  async created() {
    await this.query();
  },
};
</script>

<style lang="scss" scoped>
.user {
  &__phone {
    margin-left: 30px;
  }
}
</style>
