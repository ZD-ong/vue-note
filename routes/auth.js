import express from 'express'
const router = express.Router()

router.post('/login', (req, res, next) => {
  res.send('login')
})

router.get('/logout', (req, res, next) => {
  res.send('logout')
})

router.post('/register', (req, res, next) => {
  res.send('register')
})


export default  router

