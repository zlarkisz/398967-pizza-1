<template>
  <div class="app-layout-main">
    <AppLayoutHeader />
    <AppNotifications />
    <main class="layout">
      <div class="content">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";

import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import AppNotifications from "@/common/components/AppNotifications";

export default {
  name: "AppLayoutMain",

  components: {
    AppLayoutHeader,
    AppNotifications,
  },

  computed: {
    ...mapState("Auth", ["isAuthenticated"]),
  },
};
</script>

<style lang="scss" scoped>
.app-layout-main {
  min-height: 100vh;
}
</style>
