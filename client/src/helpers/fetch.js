import axios from 'axios'

let host = require('./host.config.js').host

function fullUrl(urlList) {
  let obj = {}
  Object.keys(urlList).forEach(key => {
    obj[key] = host + urlList[key]
  })
  return obj
}

function fetch(url, type='get', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type
    }
    if(type.toLowerCase() === 'get'){
      option.params = data
    }else {
      option.data = data
    }
    axios(option).then((res)=>{
      if(res.status === 200){
        resolve(res.data.data)
      }else{
        reject(res.data)
      }
    }).catch((err)=>{
      console.log('网络异常')
      reject({msg: '网络异常'})
    })
  })
}


export {
  fullUrl,
  fetch
}
