import Vue from 'vue'
import Router from 'vue-router'
import NotebookList from '@/components/NotebookList'
import NoteSidebar from '@/components/NoteSidebar'
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
      path: '/notebook/:notebookId',
      component: NoteSidebar,
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
      component: NoteSidebar,
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
