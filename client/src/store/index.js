import Vue from 'vue'
import Vuex from 'vuex'
import noteApi from '../api/note'
import notebookApi from '../api/notebook'
import trashApi from '../api/trash'

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    notebooks: [],
    curNotebook: {
      id: '',
      title: ''
    },
    notes: [],
    currentNote: {
      id: '',
      title: '',
      content: ''
    },
    trashNotes: []
  },

  mutations: {
    getNotebooks(state, payload){
      state.notebooks = payload.notebooks
    },
    addNotebook(state, payload){
      state.notebooks.unshift(payload.notebook)
    },
    updateNotebook(state, payload){
      let notebook = state.notebooks.find(notebook=>notebook.id == payload.notebookId)
      notebook.title = payload.title
    },
    deleteNotebook(state, payload){
      state.notebooks = state.notebooks.filter(notebook=> notebook.id != payload.notebookId)
    }
  },

  actions: {
    getNotebooks({commit}) {
      return notebookApi.getAll()
        .then(notebooks=>{
          commit('getNotebooks', {notebooks})
        })
    },
    addNotebook({commit}, payload) {
      notebookApi.addNotebook({title: payload.title})
        .then(notebook=>{
          commit('addNotebook', {notebook})
        })
    },
    updateNotebook({commit}, payload) {
      notebookApi.updateNotebook(payload.notebookId, {title: payload.title})
        .then(()=>{
          commit('updateNotebook', {notebookId: payload.notebookId , title: payload.title})
        })
    },
    deleteNotebook({commit}, payload) {
      notebookApi.deleteNotebook(payload.notebookId)
        .then(()=>{
          commit('deleteNotebook', {notebookId: payload.notebookId})
        })
    }
  },

  getters: {

  }

})