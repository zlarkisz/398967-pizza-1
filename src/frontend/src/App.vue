<template>
  <div id="app">
    <AppLayout>
      <router-view />

      <Popup v-if="orderStatus" />
    </AppLayout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import AppLayout from "@/layouts/AppLayout";
import Popup from "@/common/components/Popup";

export default {
  name: "App",

  components: {
    AppLayout,
    Popup,
  },

  computed: {
    ...mapGetters(["orderStatus"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
