<template>
  <div id="app">
    <AppLayout>
      <router-view />

      <Popup v-if="isOrderPlaced" />
    </AppLayout>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { setAuth } from "@/common/helpers";

import AppLayout from "@/layouts/AppLayout";
import Popup from "@/common/components/Popup";

export default {
  name: "App",

  components: {
    AppLayout,
    Popup,
  },

  computed: {
    ...mapState(["isOrderPlaced"]),
  },

  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    // Note: fetch initial data
    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
