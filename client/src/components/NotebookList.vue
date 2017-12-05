<template>
  <div class="detail">
    <header>
      <a href="#" class="btn" @click="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
      <el-dialog title="新建笔记" :visible.sync="dialogCreateVisible">
        <input v-model="form.title" placeholder="笔记本名" />
        <p class="error-msg" v-show="errorMsgVisibile">{{form.errorMsg}}</p>
        <div slot="footer" class="dialog-footer">
          <a class="btn" @click="dialogCreateVisible = false">取消</a>
          <a class="btn" type="primary" @click="createNotebook">创建</a>
        </div>
      </el-dialog>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <el-dialog title="修改笔记" :visible.sync="dialogEditVisible">
          <input v-model="form.title" placeholder="笔记本名" />
          <p class="error-msg" v-show="errorMsgVisibile">{{form.errorMsg}}</p>
          <div slot="footer" class="dialog-footer">
            <a class="btn" @click="dialogEditVisible = false">取消</a>
            <a class="btn" type="primary" @click="editNotebook">确定</a>
          </div>
        </el-dialog>
        <el-dialog title="删除笔记" :visible.sync="dialogDeleteVisible">
          <p> 确认要删除笔记本吗</p>
          <div slot="footer" class="dialog-footer">
            <a class="btn" @click="dialogDeleteVisible = false">取消</a>
            <a class="btn" type="primary" @click="deleteNotebook">确定</a>
          </div>
        </el-dialog>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" to="" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span> {{notebook.title}} <span>2</span><span class="action" @click="onEdit(notebook)">编辑</span>  
              <span class="action" @click="onDelete(notebook)">删除</span>  
              <span class="date">{{notebook.friendlyDate}}</span>              
            </div>
          </router-link>
        </div>       
      </div>

    </main>

  </div>
</template>

<script>

  import fetch from '../helpers/fetch'
  import { friendlyDate } from '../helpers/util'
  import { Message, Dialog } from 'element-ui'
  console.log(friendlyDate)
  
  let URL = {
    get: '/notebooks',
    create: '/notebooks',
    update: '/notebooks/:id',
    delete: '/notebooks/:id'
  }

  export default {
    data(){
      return {
        notebooks: [],
        form: {
          title: '',
          id: '',
          errorMsg: ''
        },
        dialogCreateVisible: false,
        dialogEditVisible: false,
        dialogDeleteVisible: false,
        errorMsgVisibile: false
      }
    },

    created(){
      this.getNotebooks()
    },

    methods: {
      getNotebooks(){
        fetch(URL.get)
          .then(res=>{
            this.notebooks = res.data.map(notebook=>{
              notebook.friendlyDate = friendlyDate(notebook.createdAt)
              return notebook
            })
          }).catch(err=>{
            Message.error(err.msg)
          })
      },
      createNotebook(){
        if(this.form.title.trim() === '') {
          this.form.errorMsg = '笔记本名不能为空'
          this.errorMsgVisibile = true
          return
        }
        fetch(URL.create, 'post', {title: this.form.title})
          .then((res)=>{
            Message('创建成功')
            res.data.friendlyDate = friendlyDate(res.data.createdAt)
            this.notebooks.push(res.data)
            console.log()
            this.dialogCreateVisible = false
          }).catch((err)=>{
            Message.error(err.msg)
          })
      },
      editNotebook(){
        if(this.form.title.trim() === '') {
          this.form.errorMsg = '笔记本名不能为空'
          this.errorMsgVisibile = true
          return
        }
        fetch(URL.update.replace(':id', this.form.id), 'patch', {title: this.form.title})
          .then(res=>{
            Message('修改成功')
            this.dialogEditVisible = false
            this.notebooks.find(notebook=>notebook.id == this.form.id)
                .title = this.form.title
          }).catch((err)=>{
            Message.error(err.msg)
            this.dialogDeleteVisible = false
          })
      },
      deleteNotebook(){
        fetch(URL.delete.replace(':id', this.form.id), 'delete')
          .then(res=>{
            Message('删除成功')
            this.notebooks = this.notebooks.filter(notebook=>notebook.id !== this.form.id)
            this.dialogDeleteVisible = false
          }).catch(err=>{
            Message.error(err.msg)
            this.dialogDeleteVisible = false
          })
      },
      onCreate(){
        this.form.title = ''
        this.form.id = ''
        this.errorMsgVisibile = false
        this.dialogCreateVisible = true
      },
      onEdit(notebook){
        console.log(notebook)
        this.form.title = notebook.title
        this.form.id = notebook.id
        this.dialogEditVisible = true
      },
      onDelete(notebook){
        this.form.id = notebook.id
        this.dialogDeleteVisible = true
      }
    }
  }

</script>


<style scoped>

  .detail {
    flex: 1;
  }
  .detail .btn {
    font-size: 12px;
    color: #666;
    cursor: pointer;
    margin-left: 10px;
  }
  .detail .btn .iconfont {
    font-size: 12px;
  }

  .detail input {
    width: 300px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 3px;
    outline: none;
  }

  header {
    padding: 12px;
    border-bottom: 1px solid #ccc;
  }

  main {
    padding: 30px 40px;
  }
  .layout {
    max-width: 966px;
    margin: 0 auto;
  }


  main h3{
    font-size: 12px;
    color: #000;
  }

  main .book-list {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
    background-color: #fff;
    border-radius: 4px;
    font-weight: bold;
  }
  main .book-list span {
    font-size: 12px;
    font-weight: bold;
    color: #b3c0c8;
  }
  main .date,
  main .action{
    float: right;
    margin-left: 10px;
  }
  main .iconfont {
    color: #1687ea;
    margin-right: 4px;
  }
  main .notebook {
    display: block;
    cursor: pointer;
  }
  main a.notebook:hover {
    background-color: #f7fafd;
  }

  main a.notebook div {
    border-bottom: 1px solid #ebebeb;
    padding: 12px 14px;
  }

  main .error-msg {
    font-size: 12px;
    color: red;
  }



</style>

