<template>
  <div class="layout__content">
    <AppLayoutSidebar />

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
      <div v-if="user && user.name" class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p v-if="user && user.phone" class="user__phone">
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
          <b v-if="address && address.name">
            Адрес №{{ address.id }}. {{ address.name }}
          </b>
          <div class="address-form__edit">
            <button type="button" class="icon" @click="changeAddress(address)">
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

    <div v-if="change || add" class="layout__address">
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
          <button
            type="button"
            class="button button--transparent"
            :disabled="add ? false : !address.id"
            @click="deleteAddress(address.id)"
          >
            Удалить
          </button>
          <button
            :disabled="isDisabled"
            type="submit"
            class="button"
            @click="sendAddress"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>

    <div v-if="!add && !change" class="layout__button">
      <button type="button" class="button button--border" @click="addAddress">
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import BaseTitle from "@/common/components/base/BaseTitle";
import BaseInput from "@/common/components/base/BaseInput";
import AppLayoutSidebar from "@/layouts/AppLayoutSidebar";

export default {
  name: "Profile",

  layout: "AppLayoutDefault",

  components: {
    BaseTitle,
    BaseInput,
    AppLayoutSidebar,
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
      change: false,
      add: false,
    };
  },

  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Addresses", ["addresses"]),

    isDisabled() {
      let dis = false;
      let cleanAddress = { ...this.address };
      delete cleanAddress.userId;

      const isNotEmpty = (el) => el === "";

      dis = Object.values(cleanAddress).some(isNotEmpty);

      return dis;
    },
  },

  methods: {
    ...mapActions("Addresses", ["query", "post", "delete", "put"]),

    setAddressUserId() {
      this.address.userId = this.user.id;
    },

    clearCurrentAddress() {
      for (let key in this.address) {
        this.address[key] = "";
      }
    },

    changeAddress(address) {
      this.change = true;
      this.address = address;
    },

    addAddress() {
      this.add = true;
    },

    async deleteAddress(id) {
      if (this.add) {
        this.add = false;
      } else {
        await this.delete(id);
        this.change = false;
      }

      this.clearCurrentAddress();
    },

    async sendAddress() {
      if (this.change) {
        await this.put(this.address);
      } else {
        this.setAddressUserId();
        await this.post(this.address);
      }

      this.clearCurrentAddress();
      this.change = false;
      this.add = false;
    },
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
