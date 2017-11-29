import request from 'request'
import {expect}  from 'chai'
import {model, sequelize} from '../../models'

const hash = require('../../helper/util')['hash']
const url = 'http://localhost:3000'

before((done)=>{
  sequelize.sync({force: true}).then(()=>{
    done()
  })
})

describe('GET /auth/logout', ()=>{
  it('respond with 200', done=>{
    request.get(`${url}/auth/logout`, (err, response, body)=>{
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})



describe('POST /auth/register', ()=>{
  it('respond with 400', done=>{
    request.post(`${url}/auth/register`, {
      form: {
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
  it('respond with 400', done=>{
    request.post(`${url}/auth/register`, {
      form: {
        username: '',
        password: '123456'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })

  it('respond with 400', done=>{
    request.post(`${url}/auth/register`, {
      form: {
        username: 'use',
        password: '1234'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })

  it('respond with 200', done=>{
    request.post(`${url}/auth/register`, {
      form: {
        username: 'user1', 
        password: '123456'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
  it('respond with 400', done=>{
    request.post(`${url}/auth/register`, {
      form: {
        username: 'user1', 
        password: '123456'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
})

describe('GET /auth/login', ()=>{
  it('respond with 200', done=>{
    request.post(`${url}/auth/login`, {
      form: {
        username: 'user1', 
        password: '123456'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
  it('respond with 400', done=>{
    request.post(`${url}/auth/login`, {
      form: {
        username: 'user1'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
  it('respond with 400', done=>{
    request.post(`${url}/auth/login`, {
      form: {
        username: 'user1',
        password: '12345678'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
})

