import express from 'express'
import {checkUsername, checkPassword} from '../helper/check'
import {hash} from '../helper/util'
import model from '../models'

const router = express.Router()

// 新建用户
router.post('/register', checkUsername, checkPassword, (req, res, next) => {
  console.log('/register')
  let username = req.body.username
  let password = req.body.password

  model.User.findOrCreate({where: {username}, defaults: {encryptPassword: hash(password)}})
    .spread((user, created)=>{
      if(!created){
        return res.status(400).send({msg: '用户已存在'})
      }
      res.send({msg: '创建成功', data: user})
    })

})

router.get('/logout', (req, res, next) => {
  res.send('logout')
})

router.post('/login', checkUsername, checkPassword, (req, res, next) => {
  let username = req.body.username
  let password = req.body.password
  model.User.findOne({where: {username}})
    .then(user=>{
      if(!user){
        return res.status(400).send({msg:'用户不存在'})
      }
      if(user.encryptPassword !== hash(password)){
        return res.status(400).send({msg:'密码不正确'})
      }
      res.send({msg: '登录成功', data: {username: user.username}})
    })
})


export default  router

