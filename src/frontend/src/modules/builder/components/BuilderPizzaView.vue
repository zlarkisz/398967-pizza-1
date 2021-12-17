<template>
  <div class="content__pizza">
    <BaseInput
      label="Название пиццы"
      placeholder="Введите название пиццы"
      name="pizza_name"
      hideLabel
      :value="pizzaName"
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
          <li v-for="el in fillingClasses" :key="el" :class="el" />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BaseInput from "@/common/components/base/BaseInput";

export default {
  name: "BuilderPizzaView",

  components: {
    BaseInput,
  },

  props: {
    viewIngredients: {
      type: Array,
      required: true,
    },
    pizzaName: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState("Builder", ["ingredients"]),

    fillingClasses() {
      return this.viewIngredients.flatMap((el) => {
        if (el.quantity === 0) return [];

        const currentName = this.ingredients.find(
          (ing) => ing.id === el.ingredientId
        ).name;

        if (el.quantity === 1) {
          return [
            `pizza__filling pizza__filling--${this.getImage(currentName)}`,
          ];
        } else if (el.quantity === 2) {
          return [
            `pizza__filling pizza__filling--${this.getImage(currentName)}`,
            `pizza__filling pizza__filling--${this.getImage(
              currentName
            )} pizza__filling--second`,
          ];
        } else if (el.quantity === 3) {
          return [
            `pizza__filling pizza__filling--${this.getImage(currentName)}`,
            `pizza__filling pizza__filling--${this.getImage(
              currentName
            )} pizza__filling--second`,
            `pizza__filling pizza__filling--${this.getImage(
              currentName
            )} pizza__filling--third`,
          ];
        }
      });
    },
  },

  methods: {
    onDrop(evt) {
      const draggedElementId = JSON.parse(
        evt.dataTransfer.getData("ingredientId")
      );
      this.$emit("draggElement", draggedElementId);
      evt.dataTransfer.clearData();
    },

    setName(e) {
      this.$emit("setPizzaName", { ingredient: "name", value: e });
    },

    getImage(name) {
      switch (name) {
        case "Грибы":
          return "mushrooms";
        case "Чеддер":
          return "cheddar";
        case "Салями":
          return "salami";
        case "Ветчина":
          return "ham";
        case "Ананас":
          return "ananas";
        case "Бекон":
          return "bacon";
        case "Лук":
          return "onion";
        case "Чили":
          return "chile";
        case "Халапеньо":
          return "jalapeno";
        case "Маслины":
          return "olives";
        case "Томаты":
          return "tomatoes";
        case "Лосось":
          return "salmon";
        case "Моцарелла":
          return "mozzarella";
        case "Пармезан":
          return "parmesan";
        case "Блю чиз":
          return "blue_cheese";
        default:
          return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-enter-active {
  animation: roll-in 1s;
}
.list-leave-active {
  animation: roll-in 0.5s reverse;
}
@keyframes roll-in {
  0% {
    background-size: 100%;
    opacity: 0;
  }
  25% {
    background-size: 115%;
    opacity: 0.5;
  }
  75% {
    background-size: 130%;
    opacity: 0.75;
  }
  100% {
    background-size: 100%;
    opacity: 1;
  }
}
</style>
