<template>
  <div class="app-layout-main">
    <AppLayoutHeader />

    <main class="layout">
      <AppLayoutSidebar v-if="isAuthenticated" />

      <div class="content">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";

import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import AppLayoutSidebar from "@/layouts/AppLayoutSidebar";

export default {
  name: "AppLayoutMain",

  components: {
    AppLayoutHeader,
    AppLayoutSidebar,
  },

  computed: {
    ...mapState("Auth", ["isAuthenticated"]),
  },
};
</script>

<style lang="scss" scoped></style>
