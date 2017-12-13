import fetch from '../helpers/fetch'
import { friendlyDate } from '../helpers/util'

const URL = {
  GET: '/notes/from/:notebookId',
  ADD: '/notes/to/:notebookId',
  UPDATE: '/notes/:noteId',
  DELETE: '/notes/:noteId'
}


export default {
  //get notes from notebookId
  getAll({notebookId}){
    return new Promise((resolve, reject)=>{
      fetch(URL.GET.replace(':notebookId', notebookId))
        .then(res=>{
          let notes = res.data.map(note=>{
            note.createdAtFriendly = friendlyDate(note.createdAt)
            note.updatedAtFriendly = friendlyDate(note.updatedAt)
            return note
          }).sort((note1, note2)=>{
            return note1.updatedAt < note2.updatedAt
          })
          resolve(notes)
        }).catch(err=>{
          reject(err)
        })
    })    
  },

  updateNote(noteId, {title, content}) {
    console.log(arguments)
    return new Promise((resolve, reject)=>{
      fetch(URL.UPDATE.replace(':noteId', noteId), 'PATCH', {title, content})
        .then(res=>{
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
    }) 
  },

  //delete note to trash
  deleteNote(noteId) {
    return new Promise((resolve, reject)=>{
      fetch(URL.DELETE.replace(':noteId', noteId), 'DELETE')
        .then(res=>{
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
    }) 
  },

  // add note to notebookId
  addNote(notebookId, {title='', content=''}={title:'', content:''}){
    return new Promise((resolve, reject)=>{
      fetch(URL.ADD.replace(':notebookId', notebookId), 'POST', {title, content})
        .then(res=>{
          res.data.createdAtFriendly = friendlyDate(res.data.createdAt)
          res.data.updatedAtFriendly = friendlyDate(res.data.updatedAt)
          resolve(res.data)
        }).catch(err=>{
          reject(err)
        })
    }) 
  },

  // move note to target notebook
  transforNote(targetNotebookId){
    return new Promise((resolve, reject)=>{

    }) 
  }


}