<template>
  <div class="note-content">
    <template v-if="isShowEditor">
      <vue-editor-markdown v-model="note"></vue-editor-markdown>
    </template>  
  </div>

</template>

<script>
  import VueEditorMarkdown from 'vue-editor-markdown';
  import bus from '../helpers/bus'

  export default {
    data(){
      return {
        note: {markdown: '', html: ''},
        isShowEditor: false
      }
    },
    components: {
      VueEditorMarkdown
    },
    methods: {

    },
    created(){
      bus.$on('giveNote', note=> {
        console.log('get Note...')
        console.log(note)
        this.note.markdown = note.content
        this.isShowEditor = true
      })
    },
    beforeRouteEnter (to, from, next) {
      console.log(to.params.noteId)
      bus.$emit('getNote', to.params.noteId)
      next()
    },
    beforeRouteUpdate(to, from, next){
      bus.$emit('getNote', to.params.noteId)
      next()      
    },
    mounted(){
      this.editorWidth =  getComputedStyle(document.querySelector('.note-content')).width
      this.editorHeight = getComputedStyle(document.querySelector('.note-content')).height
    }
  }
</script>

<style lang="less" scoped>
.note-content {
  flex: 1;

  .vm-markdown {
    border-radius: 0;

    .vm-editor-menu {
      border-radius: 0;
    }

    .content {
      border: 0;
    }
  }
}  

</style>