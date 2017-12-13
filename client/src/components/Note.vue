<template>
  <div class="detail" id="note">
    <note-sidebar></note-sidebar>
    <router-view></router-view>  
  </div>
  
</template>

<script>
  import NoteSidebar from '@/components/NoteSidebar'
  import { mapActions, mapState, mapMutations, mapGetters} from 'vuex'

  export default {
    components: {
      NoteSidebar
    },
    computed: {
      ...mapState([
        'notebooks',
        'curNotebook',
        'curNote',
        'isCurNotebookInit'
      ])
    },
    methods: {
      ...mapActions([
        'getNotebooks',
        'getNotes'
      ]),
      ...mapMutations([
        'setCurrentBook',
        'setCurrentNote'
        ])
    },
    created(){
      let notebookId = this.$route.params.notebookId
      let noteId = this.$route.params.noteId
      console.log('created...')
      this.getNotebooks()
        .then(()=>{
          let payload = notebookId?{notebookId}:(this.curNotebook.id?{notebookId:this.curNotebook.id}:{})
          this.setCurrentBook(payload)
          return this.getNotes({notebookId: this.curNotebook.id})      
        }).then(()=>{
          this.setCurrentNote(noteId?{noteId}:{})
        }).then(()=>{
          let path = `/notebook/${this.curNotebook.id}`
          if(this.curNote.id){
            path += `/note/${this.curNote.id}`
          }

          if(!notebookId || !noteId){
            this.$router.replace({path})
            console.log('jump')
          }
          
        })

    },

    beforeRouteUpdate (to, from, next) {
      console.log('beforeRouteUpdate...')
      console.log(to, from)
      let notebookId = to.params.notebookId
      let noteId = to.params.noteId
      this.setCurrentBook(notebookId?{notebookId}:{})
      this.getNotes({notebookId: this.curNotebook.id})
        .then(()=>{
          this.setCurrentNote(noteId?{noteId}:{})
          if(!noteId && this.curNote.id){
            let path = `/notebook/${this.curNotebook.id}/note/${this.curNote.id}`
            this.$router.replace({path})
          }
          next()
        }) 

    },
  }
</script>

<style scoped>

#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}

</style>