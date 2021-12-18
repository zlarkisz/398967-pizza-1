<template>
  <div id="app">
    <AppLayout>
      <transition name="route" mode="out-in">
        <router-view />
      </transition>

      <transition name="popup">
        <PopupManager v-if="isOrderPlaced" />
      </transition>
    </AppLayout>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { setAuth } from "@/common/helpers";

import AppLayout from "@/layouts/AppLayout";
import PopupManager from "@/common/components/PopupManager";

export default {
  name: "App",

  components: {
    AppLayout,
    PopupManager,
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
    // this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";

.popup-enter-active {
  transition: all 0.5s ease;
}

.popup-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.popup-enter,
.popup-leave-to {
  transform: scale(1);
  opacity: 0;
}

.route-enter-active {
  transition: all 0.5s ease;
}

.route-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.route-enter,
.route-leave-to {
  transform: translateX(100px);
  opacity: 1;
}
</style>
