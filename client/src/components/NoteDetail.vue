<template>
  <div class="note-content">
    <vue-editor-markdown v-model="note"></vue-editor-markdown>
  </div>

</template>

<script>
  import VueEditorMarkdown from 'vue-editor-markdown2'
  import { mapActions, mapState, mapMutations, mapGetters} from 'vuex'

  export default {
    data(){
      return {
        note: {markdown: '', html: ''}
      }
    },
    components: {
      VueEditorMarkdown
    },
    computed: {
      ...mapState([
        'curNote'
      ])
    },
    watch: {
      curNote(note){
        this.note.markdown = note && note.content
      }
    },
    methods: {
      ...mapActions([

      ]),
      ...mapMutations([
        'setCurrentNote'
        ])
    },
    created () {
      this.setCurrentNote({noteId: this.$route.params.noteId})
      this.note.markdown = this.curNote && this.curNote.content
    },
    beforeRouteUpdate(to, from, next){
      console.log('update', to.params.noteId)
      this.setCurrentNote({noteId: to.params.noteId})
      next()      
    }
  }
</script>

<style lang="less" scoped>
.note-content {
  flex: 1;
  display: flex;

  #markdown {
    height: auto;
    border: none;
    border-radius: 0;

    &.markdown-fullscreen{
      height: 100%;
    }
  }
}  

</style>