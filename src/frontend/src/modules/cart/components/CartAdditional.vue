<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li v-for="add in misc" :key="add.id" class="additional-list__item sheet">
        <p class="additional-list__description">
          <img :src="add.image" width="39" height="60" :alt="add.name" />
          <span>{{ add.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <ItemCounter
            :value="add.count"
            plusBtnTheme="orange"
            class="additional-list__counter"
            @input="
              $emit('changeAmount', { count: $event, id: add.id, list: 'misc' })
            "
          />

          <div class="additional-list__price">
            <b>{{ add.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "CartAdditional",

  components: {
    ItemCounter,
  },

  computed: {
    ...mapState("Cart", ["misc"]),
  },

  methods: {
    ...mapActions({ getMisc: "Cart/query" }),
  },

  async created() {
    await this.getMisc("misc");
  },
};
</script>

<style lang="scss" scoped></style>
