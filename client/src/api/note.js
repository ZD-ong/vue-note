import fetch from '../helpers/fetch'

export default {
  //get notes from notebookId
  getAll(notebookId){
    return new Promise(resolve, reject){

    }    
  }

  updateNote(noteId, {title, content}) {
    return new Promise(resolve, reject){
      //fetch()
    }
  },

  //delete note to trash
  deleteNote(noteId) {
    return new Promise(resolve, reject){

    }
  },

  // add note to notebookId
  addNote(notebookId, {title='', content=''}={title:'', content:''}){
    return new Promise(resolve, reject){

    }
  },

  // move note to target notebook
  transforNote(targetNotebookId){
    return new Promise(resolve, reject){

    }
  }


}