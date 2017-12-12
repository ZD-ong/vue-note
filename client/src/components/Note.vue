<template>
  <div class="detail">
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
        'isCurNotebookInit'
      ])
    },
    methods: {
      ...mapActions([
        'getNotebooks',
        'getNotes'
      ]),
      ...mapMutations([
        'setCurrentBook'
        ])
    },
    created(){
      console.log('create')
      this.getNotebooks()
        .then(()=>{
          let notebookId = this.$route.params.notebookId
          if(notebookId){
            console.log('has notebookId')
            this.setCurrentBook({notebookId})
            this.getNotes({notebookId})
          }else{
            console.log('has no notebookId')
            if(!this.isCurNotebookInit){
              this.setCurrentBook({notebookId: this.notebooks[0].id})
            }
            //
            this.$router.replace({ path: `/notebook/${this.curNotebook.id}/` })  
          }          
        })

    },

    beforeRouteUpdate (to, from, next) {
      console.log('beforeRouteUpdate...')
      console.log(to, from)
      if(to.params.notebookId){
        this.getNotes({notebookId: to.params.notebookId})
          .then(()=>{
            next()
          })
      }else{
        next()
      }
      
    },
  }
</script>

<style scoped>

.detail {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}

</style>