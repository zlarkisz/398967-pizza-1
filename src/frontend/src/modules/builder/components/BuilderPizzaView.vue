<template>
  <div class="content__pizza">
    <BaseInput
      label="Название пиццы"
      placeholder="Введите название пиццы"
      name="pizza_name"
      hideLabel
      v-model="pizzaName"
      @input="setName"
    />

    <div
      @drop="onDrop"
      @dragover.prevent
      @dragenter.prevent
      class="content__constructor"
    >
      <div class="pizza pizza--foundation--big-tomato">
        <transition-group name="list" tag="ul" class="pizza__wrapper">
          <li
            v-for="(el, i) in drops"
            :key="`pizza__filling-${i}`"
            :class="['pizza__filling', `pizza__filling--${el}`]"
          />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/common/components/base/BaseInput";

export default {
  name: "BuilderPizzaView",

  components: {
    BaseInput,
  },

  props: {
    pizzaViewIngredients: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      pizzaName: "",
      drops: [],
      name: "",
      count: 0,
    };
  },

  watch: {
    pizzaViewIngredients(newValue) {
      this.setDrop(newValue);
    },
  },

  methods: {
    onDrop(evt) {
      const draggedElement = evt.dataTransfer.getData("item");
      if (this.drops.includes(draggedElement)) return;
      this.drops.push(draggedElement);
    },

    setName(e) {
      this.$emit("setPizzaName", { ingredient: "name", value: e });
    },

    setDrop({ name, count }) {
      if (count !== 0) {
        if (this.drops.includes(name)) return;

        this.drops.push(name);
      } else {
        this.drops = this.drops.filter((el) => el !== name);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-enter-active {
  animation: roll-in 1.5s;
}
.list-leave-active {
  animation: roll-in 1.5s reverse;
}
@keyframes roll-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  25% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
