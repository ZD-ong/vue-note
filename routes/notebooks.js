import express from 'express'
import {checkNotebook} from '../helper/check'
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
    console.log('create success')
    console.log(val)
    res.send({msg: '创建笔记本成功', data: val})
  })
})

//修改笔记本标题
router.patch('/:notebookId', checkNotebook, (req, res) =>{
  let title = req.body.title
  model.Notebook.update({title:title},{where: {id: req.params.notebookId}})
    .then(([affectRow])=>{
      if(affectRow === 0){
        return res.status(400).send({msg: '笔记本不存在'})
      }
      res.send({msg: '修改成功'})
    })
})

//删除笔记本
router.delete('/:notebookId', (req, res) =>{
  model.Notebook.destroy({where: {id: req.params.notebookId}})
    .then(affectRow => {
      if(affectRow === 0){
        return res.status(400).send({msg: '笔记本不存在'})
      }
      res.send({msg: '删除成功'})
    })
})


export default router
