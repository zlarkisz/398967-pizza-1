<template>
  <div>
    <AppLayoutHeader />

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <RadioButton
                :items="dough"
                name="dough"
                size="light"
                checked
                class="sheet__content dough"
              />
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <RadioButton
                :items="sizes"
                name="diameter"
                size="small"
                class="sheet__content diameter"
              />
            </div>
          </div>

          <div class="content__ingridients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингридиенты
              </h2>

              <div class="sheet__content ingridients">
                <RadioButton
                  :items="sauces"
                  name="ingridients"
                  description="Основной соус:"
                  labelType="radio"
                  :inputVisuallyHidden="false"
                  class="ingridients__sauce"
                />

                <div class="ingridients__filling">
                  <p>Начинка:</p>

                  <ul class="ingridients__list">
                    <li
                      v-for="(ingredient, i) in ingredients"
                      :key="`ingredient-${i}`"
                      class="ingridients__item"
                    >
                      <span
                        :class="['filling', `filling--${ingredient.class}`]"
                      >
                        {{ ingredient.name }}
                      </span>

                      <div class="counter counter--orange ingridients__counter">
                        <button
                          type="button"
                          class="
                            counter__button
                            counter__button--disabled
                            counter__button--minus
                          "
                        >
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input
                          type="text"
                          name="counter"
                          class="counter__input"
                          value="0"
                        />
                        <button
                          type="button"
                          class="counter__button counter__button--plus"
                        >
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
              />
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button button--disabled" disabled>
                Готовьте!
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import pizza from "@/static/pizza.json";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "IndexHome",

  components: {
    AppLayoutHeader,
    RadioButton,
  },

  data() {
    return {
      sizes: pizza.sizes,
      dough: pizza.dough,
      sauces: pizza.sauces,
      ingredients: pizza.ingredients,
    };
  },
};
</script>

<style lang="scss" scoped></style>
