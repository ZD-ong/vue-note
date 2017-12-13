import fetch from '../helpers/fetch'
import { friendlyDate } from '../helpers/util'

const URL = {
  GET: '/notes/trash',
  REVERT: '/notes/:noteId/revert',
  DELETE: '/notes/:noteId/confirm'
}


export default {
  //get notes from notebookId
  getAll(){
    return new Promise((resolve, reject)=>{
      fetch(URL.GET)
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


  //delete note from trash
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
  revertNote(noteId){
    return new Promise((resolve, reject)=>{
      fetch(URL.REVERT.replace(':noteId', noteId), 'PATCH')
        .then(res=>{
          resolve(res.data)
        }).catch(err=>{
          reject(err)
        })
    }) 
  },




}