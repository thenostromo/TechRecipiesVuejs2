// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex';
import App from './App'
import router from './router'

Vue.use(Vuex);
Vue.config.productionTip = false

const VueStorage = new Vuex.Store({
  strict: true,
  state: {
    recipies: []
  },
  mutations: {
    addRecipe(state, value) {
      state.recipies.push(value)
    },
    setRecipies(state, value) {
      state.recipies = value
    }
  },
  getters: {
    getRecipies(state) {
      return state.recipies;
    }
  }
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: VueStorage,
  components: { App },
  template: '<App/>'
})
