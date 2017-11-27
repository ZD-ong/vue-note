const request = require('request')
const expect  = require("chai").expect

const url = 'http://localhost:3000/notebooks'

describe('GET /notebooks/', ()=>{
  it('respond with 200', done=>{
    request.get(`${url}/`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})

describe('POST /notebooks/', ()=>{
  it('respond with 200', done=>{
    request.post(`${url}/`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})

describe('PATCH /notebooks/:notebookId', ()=>{
  it('respond with 200', done=>{
    request.patch(`${url}/123456`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})

describe('DELETE /notebooks/:notebookId', ()=>{
  it('respond with 200', done=>{
    request.delete(`${url}/123456`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})

describe('GET /notebooks/:notebookId/notes', ()=>{
  it('respond with 200', done=>{
    request.get(`${url}/123456/notes`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})

describe('DELETE /notebooks/:notebookId/notes/:noteID', ()=>{
  it('respond with 200', done=>{
    request.delete(`${url}/123456/notes/654321`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})

describe('post /notebooks/:notebookId/notes', ()=>{
  it('respond with 200', done=>{
    request.post(`${url}/123456/notes`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})

describe('patch /notebooks/:notebookId/notes/:noteID', ()=>{
  it('respond with 200', done=>{
    request.patch(`${url}/123456/notes/654321`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})
