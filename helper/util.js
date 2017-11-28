import shajs from 'sha.js'

export function hash(str){
  return shajs('sha256').update(str).digest('hex')
}