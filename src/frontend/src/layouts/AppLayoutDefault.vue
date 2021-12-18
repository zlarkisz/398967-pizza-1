<template>
  <div class="app-layout-default">
    <AppLayoutHeader />
    <AppNotifications />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import AppNotifications from "@/common/components/AppNotifications";

export default {
  name: "AppLayoutDefault",

  components: {
    AppLayoutHeader,
    AppNotifications,
  },
};
</script>

<style lang="scss" scoped></style>
