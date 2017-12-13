<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
      <el-dialog title="新建笔记" :visible.sync="dialogCreateVisible">
        <input v-model="form.title" placeholder="笔记本名" />
        <p class="error-msg" v-show="errorMsgVisibile">{{form.errorMsg}}</p>
        <div slot="footer" class="dialog-footer">
          <a class="btn" @click="dialogCreateVisible = false">取消</a>
          <a class="btn" type="primary" @click="add">创建</a>
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
            <a class="btn" type="primary" @click="update">确定</a>
          </div>
        </el-dialog>
        <el-dialog title="删除笔记" :visible.sync="dialogDeleteVisible">
          <p> 确认要删除笔记本吗</p>
          <div slot="footer" class="dialog-footer">
            <a class="btn" @click="dialogDeleteVisible = false">取消</a>
            <a class="btn" type="primary" @click="deleteBook">确定</a>
          </div>
        </el-dialog>
        <div class="book-list">
          <router-link  v-for="notebook in notebooks" :to="`/notebook/${notebook.id}`" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span> {{notebook.title}} <span>{{notebook.noteCounts}}</span><span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>  
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>  
              <span class="date">{{notebook.updatedAtFriendly}}</span>              
            </div>
          </router-link>            

        </div>       
      </div>

    </main>

  </div>
</template>

<script>

  import fetch from '../helpers/fetch'
  import { mapActions, mapState } from 'vuex'
  import { Message, Dialog } from 'element-ui'

  export default {
    data(){
      return {
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

    computed: mapState([
      'notebooks'
    ]),

    methods: {
      ...mapActions([
        'getNotebooks',
        'addNotebook',
        'updateNotebook',
        'deleteNotebook'
      ]),

      add(){
        if(this.form.title.trim() === '') {
          this.form.errorMsg = '笔记本名不能为空'
          this.errorMsgVisibile = true
          return
        }
        this.addNotebook({title: this.form.title})
          .then(()=>{
            Message.success('创建成功')
            this.dialogCreateVisible = false
          })
      },

      update(){
        if(this.form.title.trim() === '') {
          this.form.errorMsg = '笔记本名不能为空'
          this.errorMsgVisibile = true
          return
        }
        this.updateNotebook({notebookId: this.form.id, title: this.form.title})
          .then(()=>{
            this.dialogEditVisible = false
          })
          .catch((err)=>{
            this.dialogEditVisible = false
          })
      },

      deleteBook(){
        this.deleteNotebook({notebookId: this.form.id})
          .then(()=>{
            Message.success('删除成功')
            this.dialogDeleteVisible = false
          }).catch(err=>{
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


<style lang="less">
@import url(../assets/css/notebook-list.less);

</style>

