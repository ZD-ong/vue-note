const request = require('request')
const expect  = require("chai").expect

const url = 'http://localhost:3000'

describe('GET /auth/logout', ()=>{
  it('respond with 200', done=>{
    request.get(`${url}/auth/logout`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})

describe('GET /auth/login', ()=>{
  it('respond with 200', done=>{
    request.post(`${url}/auth/login`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})

describe('POST /auth/register', ()=>{
  it('respond with 200', done=>{
    request.post(`${url}/auth/register`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})