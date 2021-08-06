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
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
