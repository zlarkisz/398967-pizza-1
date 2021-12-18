<template>
  <div v-if="notifications.length" class="notification__wrapper">
    <div
      v-for="{ text, type } in notifications"
      :key="type"
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
  position: relative;
  margin: 0.5rem 0 1rem 0;
  background-color: #fff;
  transition: box-shadow 0.25s;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%),
    0 1px 5px 0 rgb(0 0 0 / 20%);

  &--error {
    color: #b71c1c;
    background-color: #ffcdd2;
  }

  &--info {
    border-color: #1565c0;
    background-color: #bbdefb;
  }

  &--success {
    color: #1b5e20;
    background-color: #c8e6c9;
  }

  &--warning {
    color: #ffecb3;
    background-color: #795548;
  }

  &__wrapper {
    position: fixed;
    z-index: 9999;
    right: 0;
    width: 420px;
    padding: 10px;
  }
}
</style>
