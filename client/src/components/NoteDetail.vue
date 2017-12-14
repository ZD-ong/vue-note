<template>
  <div class="note-detail">
    <div class="note-bar">
      <span> 创建日期: {{curNote.createdAtFriendly}}</span>
      <span> 更新日期: {{curNote.updatedAtFriendly}}</span>
      <span> {{stateText}}</span>
      <span class="iconfont icon-delete" @click="dialogDeleteVisible=true"></span>
      <!-- <span class="iconfont icon-play" @click="onPlay"></span> -->
      <span class="iconfont icon-fullscreen" @click="isPreview = !isPreview"></span>
      <el-dialog title="删除笔记" :visible.sync="dialogDeleteVisible">
        <p>确定删除笔记?</p>
        <div slot="footer" class="dialog-footer">
          <a class="btn" @click="dialogDeleteVisible = false">取消</a>
          <a class="btn" type="primary" @click="onDelete">确定</a>
        </div>
      </el-dialog>
    </div>
    <div class="note-title">
      <input type="text" :value="title" @input="updateTitle" placeholder="输入标题">
    </div>
    <div class="editor">
      <textarea :value="content" @input="updateContent" v-show="!isPreview" placeholder=" 输入内容"></textarea>
      <div class="preview markdown-body" v-html="compiledMarkdown" v-show="isPreview"></div>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  import { mapActions, mapState, mapMutations, mapGetters} from 'vuex'
  import _ from 'lodash'
  import { Message } from 'element-ui'

  export default {
    data(){
      return {
        content: '',
        title: '',

        stateText: '',

        isPreview: false,
        dialogDeleteVisible: false
      }
    },
    created(){
      this.content = this.curNote.content
      this.title = this.curNote.title
    },
    computed: {
      ...mapState([
        'curNote'
      ]),
      compiledMarkdown() {
        return marked(this.content, { sanitize: true })
      }
    },
    watch: {
      curNote(note){
        this.content = note.content
        this.title = note.title
      }
    },
    methods: {
      ...mapActions([
        'updateNote',
        'deleteNote'
      ]),
      
      updateContent: _.debounce(function(e){
          this.content = e.target.value
          this.updateNote({ 
            noteId: this.curNote.id,
            content: e.target.value
          }).then(()=>{
            this.stateText = '已保存'
          })  
        }, 300),

      updateTitle: _.debounce(function(e){
        this.title = e.target.value
        this.curNote.title = e.target.value
        this.updateNote({ 
          noteId: this.curNote.id,
          title: e.target.value
        }).then(()=>{
            this.stateText = '已保存'
          })            
      }, 300),

      onDelete(){
        this.deleteNote({noteId: this.curNote.id})
          .then(()=>{
            Message.success('删除成功')
            this.dialogDeleteVisible = false
          }).catch((e)=>{
            Message.error(e.message)
            this.dialogDeleteVisible = false
          })
      },

      // onPlay(){

      // }
    }
  }
</script>

<style lang="less">
  @import url(../assets/css/note-detail.less);

</style>