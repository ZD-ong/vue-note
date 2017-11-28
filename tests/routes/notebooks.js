// chai 的用法： http://chaijs.com/guide/styles/

import request from 'request'
import {expect}  from 'chai'
import model from '../../models'

const hash = require('../../helper/util')['hash']
const url = 'http://localhost:3000/notebooks'

let notebookId = 0

before(function() {
  model.Notebook.destroy({where:{}})
})

describe('GET /notebooks/', ()=>{
  it('获取笔记本列表:应该为空', done=>{
    request.get(`${url}/`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      expect(JSON.parse(body).data).to.be.an('array')
      expect(JSON.parse(body).data).to.have.lengthOf(0)
      console.log(JSON.parse(body).data)
      done()
    })
  })
})

describe('POST /notebooks/', ()=>{
  it('创建笔记本: 无参数', done=>{
    request.post(`${url}/`, {
      form: {
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
  it('创建笔记本: 参数不符合规则', done=>{
    request.post(`${url}/`, {
      form: {
        title: ''
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
  it('创建笔记本: 参数不符合规则', done=>{
    request.post(`${url}/`, {
      form: {
        title: '1234567890123456789012345678901'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
  it('创建笔记本: 参数正确', done=>{
    request.post(`${url}/`, {
      form: {
        title: '我的笔记1'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
  it('获取笔记本列表,笔记本应该为1', done=>{
    request.get(`${url}/`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      let data = JSON.parse(body).data
      expect(data).to.be.an('array')
      expect(data).to.have.lengthOf(1)
      notebookId = data[0].id

      done()
    })
  })
  it('修改笔记本: 参数不正确', done=>{
    request.patch(`${url}/aa`, {
      form: {
        title: ''
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
  it('修改笔记本: 参数正确', done=>{
    request.patch(`${url}/${notebookId}`, {
      form: {
        title: '我的笔记2'
      }
    }, (err, response, body)=>{
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
  it('删除笔记本: 笔记本不存在', done=>{
    request.delete(`${url}/a`, (err, response, body)=>{
      expect(response.statusCode).to.equal(400)
      done()
    })
  })
  it('删除笔记本: 笔记本存在', done=>{
    request.delete(`${url}/${notebookId}`, (err, response, body)=>{
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
  it('获取笔记本列表: 应该为空', done=>{
    request.get(`${url}/`, function(err, response, body){
      expect(response.statusCode).to.equal(200)
      expect(JSON.parse(body).data).to.have.lengthOf(0)
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
