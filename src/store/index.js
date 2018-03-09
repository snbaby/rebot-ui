import Vue from 'vue';
import Vuex from 'vuex';

import framework from './modules/framework/index';

Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
  state: {
    count: 0,
  },
  modules: {
    framework,
  },
});

export default store;
