<template>
  <div class="app-layout-main">
    <AppLayoutHeader />

    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutMain",

  components: {
    AppLayoutHeader,
  },
};
</script>

<style lang="scss" scoped></style>
