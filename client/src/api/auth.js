import fetch from '../helpers/fetch'

const URL = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GET: '/auth'
}


export default {
  //get notes from notebookId
  register({username, password}){
    return new Promise((resolve, reject)=>{
      fetch(URL.REGISTER, 'POST', {username, password})
        .then(res=>{
          resolve(res.data)
        }).catch(err=>{
          reject(err)
        })
    })    
  },

  login({username, password}) {
    return new Promise((resolve, reject)=>{
      fetch(URL.LOGIN, 'POST', {username, password})
        .then(res=>{
          resolve(res.data)
        }).catch(err=>{
          reject(err)
        })
    }) 
  },

  logout() {
    return new Promise((resolve, reject)=>{
      fetch(URL.LOGOUT)
        .then(res=>{
          resolve(res.data)
        }).catch(err=>{
          reject(err)
        })
    }) 
  },

  getUser(){
    return new Promise((resolve, reject)=>{
      fetch(URL.GET)
        .then(res=>{
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
    }) 
  }


}