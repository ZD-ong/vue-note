
export function friendlyDate(dateStr){
  let dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr)
  let time = dateObj.getTime()
  let now = Date.now()
  let str = ''

  switch (true) {
    case now - time < 1000*60:
      str = '刚刚'
      break;
    case now - time < 1000*60*60:
      str = Math.floor((now - time)/(1000*60)) + '分钟前'
      break; 
    case now - time < 1000*60*60*24:
      str = Math.floor((now - time)/(1000*60*60)) + '小时前'
      break; 
    case now - time < 1000*60*60*24*30:
      str = Math.floor((now - time)/(1000*60*60*24)) + '天前'
      break; 
    default:
      str = dateObj.toLocaleDateString()
  }
  return str
}

export function throttle(fn, delay) {
    var timer = null
    return function(...args){
        clearTimeout(timer)
        timer = setTimeout(()=>{ 
            fn(...args)
        }, delay)
    }
}