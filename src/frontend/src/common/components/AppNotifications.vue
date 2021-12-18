<template>
  <div v-if="notifications.length" class="notification__wrapper">
    <div
      v-for="({ text, type }, i) in notifications"
      :key="i"
      :class="`notification notification--${type}`"
    >
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Notifications",
  computed: {
    ...mapState(["notifications"]),
  },
};
</script>

<style lang="scss" scoped>
.notification {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  padding: 20px;
  text-align: center;
  border: 2px solid red;
  &__wrapper {
    position: fixed;
    z-index: 9999;
    right: 0;
    width: 420px;
    padding: 10px;
  }
}
</style>
