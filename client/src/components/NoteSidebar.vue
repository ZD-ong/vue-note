<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="onAddNote">添加笔记</span>
    <el-dropdown class="notebook-title"  @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{curNotebook.title}} <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id">{{notebook.title}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes">
        <router-link :to="`/notebook/${curNotebook.id}/note/${note.id}`">
          <span class="date">{{note.updatedAtFriendly}}</span>
          <span class="title">{{note.title}}</span>          
        </router-link>

      </li>
    </ul>
  </div>
</template>

<script>
  import fetch from '../helpers/fetch'
  import { Message } from 'element-ui'
  import { mapActions, mapState, mapMutations, mapGetters} from 'vuex'


  export default {

    computed: {
      ...mapState([
        'notebooks',
        'notes',
        'curNotebook',
        'curNote'
      ])
    },

    methods: {
      ...mapActions([
        'addNote'
      ]),
      ...mapMutations([
        'setCurrentBook'
      ]),

      handleCommand(notebookId){
        this.setCurrentBook({notebookId})
        this.$router.replace({ path: `/notebook/${this.curNotebook.id}/` })      
      },

      onAddNote(){
        this.addNote({title: '', content: '', notebookId: this.curNotebook.id})
          .then(()=>{
            this.$router.push({ path: `/notebook/${this.curNotebook.id}/note/${this.curNote.id}` })  
            Message.success('创建笔记成功')
          }).catch(err=>{
            Message.error('创建笔记失败')
          })
      }
    }
  }

</script>


<style lang="less" >
@import url(../assets/css/note-sidebar.less);

</style>


