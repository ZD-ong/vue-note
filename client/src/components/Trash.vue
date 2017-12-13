<template>
  <div class="detail" id="trash">
    <div class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div>更新时间 <i class="iconfont icon-down"></i></div>
        <div>标题 </div>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes">
          <router-link :to="`/trash/${note.id}`">
            <span class="date">{{note.updatedAtFriendly}}</span>
            <span class="title">{{note.title}}</span>          
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail">
      <div class="note-bar" v-if="note">
        <span> 创建日期: {{note.createdAtFriendly}}</span> 
        <span> | </span>
        <span> 更新日期: {{note.updatedAtFriendly}}</span>
        <span> | </span>
        <span> 所属笔记本: {{belongTo}}</span>

        <a class="btn action" @click="onRevert">恢复</a>
        <a class="btn action" @click="dialogDeleteVisible = true">彻底删除</a>
        <el-dialog title="删除笔记" :visible.sync="dialogDeleteVisible">
          <p>彻底删除笔记后将无法回复</p>
          <div slot="footer" class="dialog-footer">
            <a class="btn" @click="dialogDeleteVisible = false">取消</a>
            <a class="btn" type="primary" @click="onDelete">确定</a>
          </div>
        </el-dialog>
      </div>
      <div class="note-title">
        <span>{{note.title}}</span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
  
</template>

<script>
  import marked from 'marked'
  import { mapActions, mapState, mapMutations, mapGetters} from 'vuex'
  import { Message } from 'element-ui'
  
  export default {
    data(){
      return {
        note: {
          title: '',
          content: ''
        },
        belongTo: '',
        dialogDeleteVisible: false
      }
    },

    computed: {
      ...mapState([
        'notebooks',
        'trashNotes'
      ]),
      compiledMarkdown(){
        return marked(this.note.content, { sanitize: true })
      }
    },
    watch: {
      note(note){
        console.log('note change...')
        let book = this.notebooks.find(notebook=>notebook.id == note.notebookId)
        if(book){
          this.belongTo = book.title
        }
      }
    },

    methods: {
      ...mapActions([
        'getTrashNotes',
        'deleteTrashNote',
        'revertTrashNote'
      ]),

      onDelete(){
        this.deleteTrashNote({noteId: this.note.id})
          .then(()=>{
            Message.success('已删除')
            if(this.trashNotes.length === 0){
              this.$router.replace(`/trash`)
            }else {
              this.note = this.trashNotes[0]
              this.$router.replace(`/trash/${this.note.id}`)
            }
            this.dialogDeleteVisible = false
          })
      },

      onRevert(){
        this.revertTrashNote({note: this.note})
          .then(()=>{
            Message.success('已恢复到笔记本')
          })
      }
    },

    created(){
      this.getTrashNotes()
        .then(()=>{
          if(this.$route.params.noteId){
             this.note = this.trashNotes.find(trashNote=>trashNote.id == this.$route.params.noteId)
          }else if(this.trashNotes.length > 0){
            this.note = this.trashNotes[0]
            this.$router.replace(`/trash/${this.note.id}`)
          }
        })
      console.log('created')
    },

    beforeRouteUpdate (to, from, next) {
      this.note = this.trashNotes.find(trashNote=>trashNote.id == to.params.noteId)
      next()
    }

  }


</script>


<style lang="less">
@import url(../assets/css/note-sidebar.less);
@import url(../assets/css/note-detail.less);
  
#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;

  .note-bar {
    .action {
      float: right;
      margin-left: 10px;
      padding: 2px 4px;
      font-size: 12px;

    }
  }
}



</style>

