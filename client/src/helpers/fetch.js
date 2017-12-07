import axios from 'axios'
import hostConfig from './host.config.js'
import { Message } from 'element-ui'

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
        Message.error(res.data.msg||'参数错误')
        reject(res.data)
      }
    }).catch(function(err){
      Message.error('网络异常')
      reject({msg: '网络异常'})
    })
  })
}

