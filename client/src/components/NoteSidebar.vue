<template>
  <div class="note-sidebar">
    <span class="btn add-note">添加笔记</span>
    <el-dropdown @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{notebook.title}} <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id">{{notebook.title}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间 <i class="iconfont icon-down"></i></div>
      <div>标题 </div>
    </div>
    <ul class="notes">
      <li v-for="note in notes">
        <span class="date">{{note.friendlyDate}}</span>
        <span class="title">{{note.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import fetch from '../helpers/fetch'
  import { friendlyDate } from '../helpers/util'
  import { Message } from 'element-ui'

  let URL = {
    getNotes: '/notes/from/:notebookId',
    getNotebooks: '/notebooks'
  }

  export default {
    data(){
      return {
        notes: [],
        notebooks: [],
        notebook: {
          id: this.$route.params.notebookId,
          title: ''
        }
      }
    },

    created(){
      this.getNotes()
      this.getNotebooks()
      console.log(this.notebookId)
    },

    methods: {
      getNotes(){
        fetch(URL.getNotes.replace(':notebookId', this.notebook.id))
          .then(res=>{
            this.notes = res.data.map(note=>{
              note.friendlyDate = friendlyDate(note.createdAt)
              return note
            }).sort((note1, note2)=>{
              return note1.createdAt < note2.createdAt
            })
          }).catch(err=>{
            Message.error(err.msg)
          })
      },

      getNotebooks(){
        fetch(URL.getNotebooks)
          .then(res=>{
            this.notebooks = res.data.map(notebook=>{
              notebook.friendlyDate = friendlyDate(notebook.createdAt)
              return notebook
            }).sort((book1, book2)=>book1.createdAt < book2.createdAt)

            this.notebook.title = this.notebooks.filter(notebook=>notebook.id == this.notebook.id)[0].title
          }).catch(err=>{
            Message.error(err.msg)
          })
      },

      handleCommand(command){
        this.notebook.id = command
        console.log(this.notebooks.filter(notebook=>notebook.id == this.notebook.id))
        this.notebook.title = this.notebooks.filter(notebook=>notebook.id == command)[0].title
        this.getNotes()        
      }
    }
  }

</script>



<style lang="less" scoped>
.note-sidebar {
  position: relative;
  width: 290px;
  border-right: 1px solid #ccc;
  background-color: #eee;

  .add-note {
    position: absolute;
    right: 5px;
    top: 12px;
    color: #666;
    font-size: 12px;
    padding: 2px 4px;
    box-shadow: 0px 0px 2px 0px #ccc;
    border: none;
    z-index: 1;
  }

  .el-dropdown {
    font-size: 18px;
    color: #333;
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    background-color: #f7f7f7;
    display: block;
  }
  .el-dropdown-link{
    cursor: pointer;
  }
  .el-dropdown-menu__item{
    width: 200px;
  }

  .menu {
    display: flex;
    
    div {
      font-size: 12px;
      padding: 2px 10px;
      flex: 1;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;

      &:last-child {
        border-right: none;
      }
    }

    .iconfont{
      font-size: 10px;
    }
  }

  .notes {
    li {
      font-size: 12px;
      padding: 4px 0;
      display: flex;

      &:nth-child(odd) {
        background-color: #f2f2f2;
      }

      span {
        padding: 0 10px;
        flex: 1;
      }
    }
  }
}



</style>


