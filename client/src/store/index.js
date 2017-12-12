import Vue from 'vue'
import Vuex from 'vuex'
import noteApi from '../api/note'
import notebookApi from '../api/notebook'
import trashApi from '../api/trash'

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    notebooks: [],
    notes: [],
    trashNotes: [],
    curNotebook: {title: ''},
    isCurNotebookInit: false,
    curNote: {title: '', content: ''}
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
    },

    setCurrentBook(state, payload){
      let notebook = state.notebooks.find(notebook=>notebook.id == payload.notebookId)
      state.curNotebook = notebook
      state.isCurNotebookInit = true
    },

    getNotes(state, payload){
      state.notes = payload.notes
    },

    addNote(state, payload){
      state.notes.unshift(payload.note)
    },
    updateNote(state, payload){
      let notebook = state.notes.find(note=>note.id == payload.noteId)
      note.title = payload.title
    },
    deleteNote(state, payload){
      state.notes = state.notes.filter(note=> note.id != payload.noteId)
    },
    setCurrentNote(state, payload){
      let note = state.notes.find(note=>note.id == payload.noteId)
      state.curNote = note
    },
  },

  actions: {
    getNotebooks({commit, state}) {
      return notebookApi.getAll()
        .then(notebooks=>{
          commit('getNotebooks', {notebooks})
          if(notebooks.length > 0 && !state.isCurNotebookInit) {
            commit('setCurrentBook', {notebookId: notebooks[0].id})
          }
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
      console.log(payload.notebookId)
      notebookApi.deleteNotebook(payload.notebookId)
        .then(()=>{
          commit('deleteNotebook', {notebookId: payload.notebookId})
        })
    },


    getNotes({commit, state}, payload) {
      return noteApi.getAll({notebookId: payload.notebookId})
        .then(notes=>{
          commit('getNotes', {notes})
          if(notes.length > 0) {
            commit('setCurrentNote', {noteId: notes[0].id})
          }
        })
    },
    addNote({commit}, payload) {
      notebookApi.addNote({title: payload.title})
        .then(notebook=>{
          commit('addNote', {notebook})
        })
    },
    updateNote({commit}, payload) {
      notebookApi.updateNote(payload.notebookId, {title: payload.title})
        .then(()=>{
          commit('updateNote', {notebookId: payload.notebookId , title: payload.title})
        })
    },
    deleteNote({commit}, payload) {
      console.log(payload.notebookId)
      notebookApi.deleteNote(payload.notebookId)
        .then(()=>{
          commit('deleteNote', {notebookId: payload.notebookId})
        })
    }
  },


})