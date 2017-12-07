import fetch from '../helpers/fetch'
import { friendlyDate } from '../helpers/util'

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
}

export default {
  getAll(){
    return new Promise((resolve, reject)=>{
      fetch(URL.GET)
        .then(res=>{
          res.data = res.data.map(notebook=>{
            notebook.friendlyDate = friendlyDate(notebook.createdAt)
            return notebook
          }).sort((book1, book2)=>book1.createdAt < book2.createdAt)
          resolve(res.data)
        }).catch(err=>{
          reject(err)
        })
    })
  },

  updateNotebook(notebookId, {title}) {
    return new Promise((resolve, reject)=>{
      fetch(URL.UPDATE.replace(':id', notebookId), 'patch', {title})
        .then(res=>{
          resolve()
        }).catch((err)=>{
          reject(err)
        })
    })
  },

  deleteNotebook(notebookId) {
    return new Promise((resolve, reject)=>{
      fetch(URL.DELETE.replace(':id', notebookId), 'delete')
        .then(res=>{
          resolve()
        }).catch(err=>{
          reject(err)
        })
    })
  },

  addNotebook({title=''}={title:''}){
    return new Promise((resolve, reject)=>{
      fetch(URL.ADD, 'post', {title})
        .then((res)=>{
          resolve(res.data)
        }).catch((err)=>{
          reject(err)
        })
    })
  }
}