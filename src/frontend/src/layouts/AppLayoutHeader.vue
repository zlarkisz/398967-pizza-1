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
        <router-link
          :key="dynamicLink"
          :to="dynamicLink"
          :class="!user ? 'header__login' : false"
        >
          <img
            v-if="user"
            :src="user.avatar"
            alt="Василий Ложкин"
            width="32"
            height="32"
          />
          <span>{{ buttonMessage }}</span>
        </router-link>
      </transition>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "AppLayoutHeader",

  computed: {
    ...mapGetters("Cart", ["totalAmount"]),
    ...mapState({
      isLogin: (state) => state.Auth.isAuthenticated,
      user: (state) => state.Auth.user,
    }),
    dynamicLink() {
      return this.user ? "/profile" : "/login";
    },
    buttonMessage() {
      switch (this.dynamicLink) {
        case "/profile":
          return this.user.name;
        default:
          return "Войти";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sign-in-enter-active {
  transition: all 0.5s ease;
}

.sign-in-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.sign-in-enter,
.sign-in-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
