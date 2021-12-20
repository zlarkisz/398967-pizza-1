<template>
  <div class="layout__sidebar sidebar">
    <router-link class="layout__link"
                 to="/orders"
    >
      История заказов
    </router-link>
    <router-link class="layout__link layout__link--active"
                 to="/profile"
    >
      Мои данные
    </router-link>
  </div>
</template>

<script>
export default {
  name: "AppLayoutSidebar",
};
</script>

<style lang="scss" scoped></style>
