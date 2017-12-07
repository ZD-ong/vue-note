import axios from 'axios'

import hostConfig from './host.config.js'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = hostConfig.host

export default function fetch(url, type='get', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
      validateStatus (status) {
        return (status >= 200 && status < 300)|| status === 400
      }
    }
    if(type.toLowerCase() === 'get'){
      option.params = data
    }else {
      option.data = data
    }
    axios(option).then((res)=>{
      if(res.status === 200){
        resolve(res.data)
      }else{
        reject(res.data)
      }
    }).catch(function(err){
      reject({msg: '网络异常'})
    })
  })
}

