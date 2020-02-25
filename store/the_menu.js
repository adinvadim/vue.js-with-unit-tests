import Vue from 'vue';

export default {
  namespaced: true,
  state() {
    return {
      menu: [],
      isVisible: false,
    };
  },
  mutations: {
    SET_MENU(state, menu) {
      Vue.set(state, 'menu', menu);
    },
    TURN_VISIBLE(state, val) {
      Vue.set(state, 'isVisible', val);
    },
  },
};
