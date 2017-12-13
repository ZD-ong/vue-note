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
      state.isCurNotebookInit = true
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
      if(payload.notebookId){
        let notebook = state.notebooks.find(notebook=>notebook.id == payload.notebookId)
        state.curNotebook = notebook
        state.isCurNotebookInit = true        
      }else if(state.notebooks.length > 0){
        state.curNotebook = state.notebooks[0]
      }else {
        state.curNotebook = {
          title: ''
        }
      }
    },

    getNotes(state, payload){
      state.notes = payload.notes
    },

    addNote(state, payload){
      state.notes.unshift(payload.note)
    },
    updateNote(state, payload){
      let note = state.notes.find(note=>note.id == payload.noteId)
      note.title = payload.title
      note.content = payload.content
    },
    deleteNote(state, payload){
      state.notes = state.notes.filter(note=> note.id != payload.noteId)
    },
    setCurrentNote(state, payload){
      if(payload.noteId){
        let note = state.notes.find(note=>note.id == payload.noteId)
        state.curNote = note        
      }else if(state.notes.length > 0){
        state.curNote = state.notes[0]
      }else {
        state.curNote = {
          title: '',
          content: ''
        }
      }

    },

    getTrashNotes(state, payload){
      state.trashNotes = payload.notes
    },
    deleteTrashNote(state, payload){
      state.trashNotes = state.trashNotes.filter(note=> note.id != payload.noteId)
    },
    revertTrashNote(state, payload){
      if(payload.notebookId === state.curNotebook.id){
        let note = state.trashNotes.filter(note=> note.id != payload.noteId)
        state.notes.unshift(note)
      }
      console.log('filter...')
      console.log(payload)
      state.trashNotes = state.trashNotes.filter(note=> note.id != payload.noteId)
    }

  },

  actions: {
    getNotebooks({commit, state}) {
      if(state.isCurNotebookInit){
        return new Promise((resolve, reject)=>{
          resolve(state.notebooks)
        })
      }else{
        return notebookApi.getAll()
          .then(notebooks=>{
            commit('getNotebooks', {notebooks})
          })        
        }
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
        })
    },
    addNote({commit}, payload) {
      console.log('addNote Action')
      return noteApi.addNote(payload.notebookId, {
        title: payload.title, 
        content: payload.content
      }).then(note=>{
          commit('addNote', {note})
          commit('setCurrentNote', {noteId: note.id})
        })
    },
    updateNote({commit}, payload) {
      console.log(payload)
      noteApi.updateNote(payload.noteId, {
        title: payload.title,
        content: payload.content
      })
    },
    deleteNote({commit}, payload) {
      console.log(payload.noteId)
      noteApi.deleteNote(payload.noteId)
        .then(()=>{
          commit('deleteNote', {noteId: payload.noteId})
        })
    },

    getTrashNotes({commit, state}, payload) {
      return trashApi.getAll()
        .then(notes=>{
          commit('getTrashNotes', {notes})
        })
    },

    deleteTrashNote({commit, state}, payload) {
      return trashApi.deleteNote(payload.noteId)
        .then(()=>{
          commit('deleteTrashNote', {noteId: payload.noteId})
        })
    },

    revertTrashNote({commit, state}, payload) {
      return trashApi.revertNote(payload.note.id)
        .then(()=>{
          commit('revertTrashNote', {
            noteId: payload.note.id,
            notebookId: payload.note.notebookId
          })
        })      
    }


  },


})