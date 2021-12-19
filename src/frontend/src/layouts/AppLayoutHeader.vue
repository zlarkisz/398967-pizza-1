<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{ totalAmount }} ₽</router-link>
    </div>
    <div class="header__user">
      <transition name="sign-in" mode="out-in">
        <router-link v-if="user" to="/profile">
          <img :src="user.avatar" alt="Василий Ложкин" width="32" height="32" />
          <span>{{ user.name }}</span>
        </router-link>
      </transition>
      <transition name="sign-in" mode="out-in">
        <a :key="dynamicLink" class="header__login" @click="log">
          <span>{{ dynamicLink }}</span>
        </a>
      </transition>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logout from "@/common/mixins/logout";

export default {
  name: "AppLayoutHeader",

  mixins: [Logout],

  computed: {
    ...mapGetters("Cart", ["totalAmount"]),
    ...mapState({
      isLogin: (state) => state.Auth.isAuthenticated,
      user: (state) => state.Auth.user,
    }),
    dynamicLink() {
      return this.user ? "Выйти" : "Войти";
    },
  },

  methods: {
    async log() {
      if (this.dynamicLink === "Войти" && this.$route.name !== "Login") {
        this.$router.push("/login");
      } else if (this.dynamicLink === "Выйти") {
        await this.$logout();
      } else {
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
