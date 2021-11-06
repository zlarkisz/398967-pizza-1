import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Popup from "@/common/components/Popup.vue";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe("Popup.vue", () => {
  let mutations;
  let store;

  beforeEach(() => {
    mutations = {
      SET_ORDER_STATUS: jest.fn(),
    };
    store = new Vuex.Store({
      mutations,
    });
  });

  it("calls the mutationClick storage action on the click", (done) => {
    const wrapper = shallowMount(Popup, { store, localVue, router });

    wrapper.find("a").trigger("click");
    wrapper.find(".popup__button").trigger("click");
    expect(mutations.SET_ORDER_STATUS).toHaveBeenCalled();
    expect(mutations.SET_ORDER_STATUS).toHaveBeenCalled();

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$route.path).toBe("/");
      done();
    });
  });
});
