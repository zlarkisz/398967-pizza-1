<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>

    <div class="sign-form__title">
      <BaseTitle :level="1">Авторизуйтесь на сайте</BaseTitle>
    </div>

    <form @submit.prevent.stop="submitHandler">
      <div class="sign-form__input">
        <BaseInput
          label="E-mail"
          placeholder="example@mail.ru"
          name="email"
          type="email"
          v-model="user.email"
        />
      </div>

      <div class="sign-form__input">
        <BaseInput
          label="Пароль"
          placeholder="***********"
          name="pass"
          type="password"
          v-model="user.password"
        />
      </div>

      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import BaseTitle from "@/common/components/base/BaseTitle";
import BaseInput from "@/common/components/base/BaseInput";

export default {
  name: "Login",

  layout: "AppLayoutMain",

  components: {
    BaseTitle,
    BaseInput,
  },

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    ...mapActions({ login: "Auth/login" }),

    async submitHandler() {
      await this.login({ credentials: this.user });

      // Добавил таймаут, потому что в роуте почему-то не видит сразу store.state.Auth.isAuthenticated
      setTimeout(() => this.$router.push("/"), 1000);
    },
  },
};
</script>

<style lang="scss" scoped></style>
