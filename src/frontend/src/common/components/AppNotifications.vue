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
  name: "AppNotifications",
  computed: {
    ...mapState(["notifications"]),
  },
};
</script>

<style lang="scss" scoped></style>
