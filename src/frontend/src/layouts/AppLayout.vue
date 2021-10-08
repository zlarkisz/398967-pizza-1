<template>
  <transition name="route" mode="out-in">
    <component :is="layout">
      <slot />
    </component>
  </transition>
</template>

<script>
const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",

  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style lang="scss" scoped>
.route-enter-active {
  transition: all 0.3s ease;
}

.route-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.route-enter,
.route-leave-to {
  transform: translateX(100px);
  opacity: 1;
}
</style>
