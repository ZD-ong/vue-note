import Vue from 'vue'
import Router from 'vue-router'
import NoteBook from '@/components/NoteBook'
import Note from '@/components/Note'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/notebook'
    },
    {
      path: '/notebook',
      component: NoteBook
    },
    {
      path: '/note',
      component: Note
    }
  ]
})
