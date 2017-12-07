import Vue from 'vue'
import Vuex from 'vuex'
import note from './note'
import notebook from './notebook'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    notebooks: [],
    curNotebook: {
      id: '',
      title: ''
    },
    notes: []
  },
  modules: {
    note,
    notebook
  },
  mutations: {

  },
  actions: {

  },
  getters: {

  },

})