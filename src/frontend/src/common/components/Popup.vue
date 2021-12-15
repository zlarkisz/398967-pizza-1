<template>
  <div class="popup">
    <a class="close" @click="closePopup">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button" @click="closePopup">
      <a class="button">Отлично, я жду!</a>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "Popup",

  computed: {
    ...mapState("Auth", { isAuth: "isAuthenticated" }),
  },

  methods: {
    ...mapMutations(["SET_ORDER_STATUS"]),

    closePopup() {
      this.SET_ORDER_STATUS(false);

      setTimeout(() => this.$router.push(!this.isAuth ? "/" : "/orders"), 1000);
    },
  },
};
</script>

<style lang="scss" scoped></style>
