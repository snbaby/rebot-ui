import stateObj from './state';
import mutationsObj from './mutations';
import gettersObj from './getters';
import actionsObj from './actions';

const store = {
  namespaced: true,
  actions: actionsObj,
  getters: gettersObj,
  mutations: mutationsObj,
  state: stateObj,

};

export default store;
