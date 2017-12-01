import express from 'express'
import {checkNote, checkParam} from '../helper/check'
import {model} from '../models'
const router = express.Router()

//获取笔记列表
router.get('/from/:notebookId', checkParam, (req, res) => {
  model.Note.findAll({where: {notebookId: req.params.notebookId, isDelete: false}})
    .then(notes=>{
      res.send({data: notes})
    })
})

//删除笔记,放入回收站
router.delete('/:noteId', (req, res) => {
  model.Note.update({isDelete: true},{where: {id: req.params.noteId}})
  .then(([affectRow])=>{
    if(affectRow === 0){
      return res.status(400).send({msg: '笔记不存在'})
    }
    res.send({msg: '放入回收站'})
  })

})


//创建笔记
router.post('/to/:notebookId', checkNote, checkParam, (req, res) => {
  let [title, content] = [req.body.title, req.body.content]
  model.Notebook.findById(req.params.notebookId)
    .then(notebook=>{
      if(notebook === null){
        return res.status(400).send({msg: '参数错误，笔记本不存在'})
      }
      model.Note.create({title, content}).then(note=>{
        notebook.addNote(note)
        res.send({data: note})
      })
    })
})

//修改笔记
router.patch('/:noteId', checkNote, (req, res) => {
  let [title, content] = [req.body.title, req.body.content]
  console.log('修改笔记')
  console.log(title, content)
  model.Note.update({title, content},{where: {id: req.params.noteId}})
    .then(([affectRow])=>{
      if(affectRow === 0){
        return res.status(400).send({msg: '笔记不存在'})
      }
      res.send({msg: '修改成功'})
    })
})

//从回收站彻底删除笔记
router.delete('/:noteId/confirm', (req, res) => {
  model.Note.destroy({where: {id: req.params.noteId}})
    .then(affectRow=>{
      console.log(affectRow)
      if(affectRow === 0){
        return res.status(400).send({msg: '笔记不存在'})
      }
      res.send({msg: '删除成功'})
    })    
})

//获取回收站笔记
router.get('/trash', (req, res) => {
  model.Note.findAll({where: {isDelete: true}})
    .then(notes=>{
      res.send({data: notes})
    })
})

//从回收站恢复笔记
router.patch('/:noteId/revert', (req, res) => {
  model.Note.update({isDelete: false},{where: {id: req.params.noteId}})
  .then(([affectRow])=>{
    if(affectRow === 0){
      return res.status(400).send({msg: '笔记不存在'})
    }
    res.send({msg: '已从回收站恢复'})
  })
})




export default router
