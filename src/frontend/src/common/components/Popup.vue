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
import { mapMutations } from "vuex";

export default {
  name: "Popup",

  methods: {
    ...mapMutations(["setOrderStatus"]),

    closePopup() {
      this.setOrderStatus(false);
    },
  },
};
</script>

<style lang="scss" scoped></style>
