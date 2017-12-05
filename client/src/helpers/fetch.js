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
    axios({
      method: type,
      url,
      data
    }).then((res)=>{
      if(res.status === 200){
        resolve(res.data.data)
      }else{
        console.log(res.data.msg)
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
