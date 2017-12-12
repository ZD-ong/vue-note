import fetch from '../helpers/fetch'
import { friendlyDate } from '../helpers/util'

const URL = {
  GET: '/notes/from/:notebookId',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
}


export default {
  //get notes from notebookId
  getAll({notebookId}){
    return new Promise((resolve, reject)=>{
      fetch(URL.GET.replace(':notebookId', notebookId))
        .then(res=>{
          let notes = res.data.map(note=>{
            note.friendlyDate = friendlyDate(note.createdAt)
            return note
          }).sort((note1, note2)=>{
            return note1.createdAt < note2.createdAt
          })
          resolve(notes)
        }).catch(err=>{
          reject(err)
        })
    })    
  },

  updateNote(noteId, {title, content}) {
    return new Promise((resolve, reject)=>{

    }) 
  },

  //delete note to trash
  deleteNote(noteId) {
    return new Promise((resolve, reject)=>{

    }) 
  },

  // add note to notebookId
  addNote(notebookId, {title='', content=''}={title:'', content:''}){
    return new Promise((resolve, reject)=>{

    }) 
  },

  // move note to target notebook
  transforNote(targetNotebookId){
    return new Promise((resolve, reject)=>{

    }) 
  }


}