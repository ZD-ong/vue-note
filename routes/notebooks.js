import express from 'express'
import {checkNotebook, checkNote} from '../helper/check'
import {model} from '../models'
const router = express.Router()

//获取笔记本列表
router.get('/', (req, res) => {
  model.Notebook.findAll()
    .then(notebooks=>{
      res.send({data: notebooks})
    })
})

//创建笔记本
router.post('/', checkNotebook, (req, res) =>{
  let title = req.body.title
  model.Notebook.create({title}).then(val=>{
    res.send({msg: '创建笔记本成功'})
  })
})

//修改笔记本标题
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

//删除笔记本
router.delete('/:notebookID', (req, res) =>{
  model.Notebook.destroy({where: {id: req.params.notebookID}})
    .then(affectRow => {
      if(affectRow === 0){
        return res.status(400).send({msg: '笔记本不存在'})
      }
      res.send({msg: '删除成功'})
    })
})

//获取笔记本下的笔记列表
router.get('/:notebookID/notes', (req, res) => {
  model.Notebook.findById(req.params.notebookID)
    .then(notebook=>{
      console.log(notebook)
      if(notebook === null){
        return res.status(400).send({msg: '笔记本不存在'})
      }
      notebook.getNotes().then(notes=>{
        res.send({data: notes})
      })
    })
})

//删除笔记本下的笔记
router.delete('/:notebookID/notes/:noteID', (req, res) => {
  model.Note.destroy({where: {id: req.params.noteID}})
    .then(affectRow=>{
      console.log(affectRow)
      if(affectRow === 0){
        return res.status(400).send({msg: '笔记不存在'})
      }
      res.send({msg: '删除成功'})
    })
})

//创建笔记
router.post('/:notebookID/notes', checkNote, (req, res) => {
  let [title, content] = [req.body.title, req.body.content]
  model.Notebook.findById(req.params.notebookID)
    .then(notebook=>{
      model.Note.create({title, content}).then(note=>{
        notebook.addNote(note)
        res.send({data: note})
      })
    })
})

//修改笔记
router.patch('/:notebookID/notes/:noteID', checkNote, (req, res) => {
  let [title, content] = [req.body.title, req.body.content]
  model.Notebook.update({title, content},{where: {id: req.params.noteID}})
    .then(([affectRow])=>{
      if(affectRow === 0){
        return res.status(400).send({msg: '笔记不存在'})
      }
      res.send({msg: '修改成功'})
    })
})


export default router
