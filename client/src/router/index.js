import Vue from 'vue'
import Router from 'vue-router'
import NotebookList from '@/components/NotebookList'
import Note from '@/components/Note'
import NoteEmpty from '@/components/NoteEmpty'
import NoteDetail from '@/components/NoteDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/notebooks',
      alias: '/',
      component: NotebookList
    },
    {
      path: '/notebook',
      component: Note
    },
    {
      path: '/notebook/:notebookId',
      component: Note,
      children: [
        {
          path: '',
          component: NoteEmpty
        },
        {
          path: 'note/:noteId',
          component: NoteDetail
        }
      ]
    },
    {
      path: '/trash',
      component: Note,
      children: [
        {
          path: '',
          component: NoteEmpty
        },
        {
          path: ':noteId',
          component: NoteDetail
        }
      ]
    }
  ]
})
