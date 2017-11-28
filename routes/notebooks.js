import express from 'express'
import {checkNotebook} from '../helper/check'
import model from '../models'
const router = express.Router()

router.get('/', (req, res) => {
  model.Notebook.findAll()
    .then(notebooks=>{
      res.send({data: notebooks})
    })
})

router.post('/', checkNotebook, (req, res) =>{
  let title = req.body.title
  model.Notebook.create({title}).then(val=>{
    res.send({msg: '创建笔记本成功'})
  })
})

router.patch('/:notebookID', checkNotebook, (req, res) =>{
  let title = req.body.title
  model.Notebook.update({title:title},{where: {id: req.params.notebookID}})
    .then(([affectRow])=>{
      if(affectRow === 0){
        return res.status(400).send({msg: '笔记本不存在'})
      }
      res.send({msg: '修改成功'})
    })
})

router.delete('/:notebookID', (req, res) =>{
  model.Notebook.destroy({where: {id: req.params.notebookID}})
    .then(affectRow => {
      if(affectRow === 0){
        return res.status(400).send({msg: '笔记本不存在'})
      }
      res.send({msg: '删除成功'})
    })
})

router.get('/:notebookID/notes', (req, res) => {
  res.send('get all notes in :notebookID')
})

router.delete('/:notebookID/notes/:noteID', (req, res) => {
  res.send('get :noteID in :notebookID')
})

router.post('/:notebookID/notes', (req, res) => {
  res.send('create :noteID in :notebookID')
})

router.patch('/:notebookID/notes/:noteID', (req, res) => {
  res.send('pudate :noteID in :notebookID')
})


export default router
