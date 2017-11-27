import express from 'express' 
const router = express.Router()


router.get('/', (req, res) => {
  res.send('get all notebooks')
})

router.post('/', (req, res) =>{
  res.send('create notebook')
})

router.patch('/:notebookId', (req, res) =>{
  res.send('modify notebook')
})

router.delete('/:notebookId', (req, res) =>{
  res.send('delete notebook')
})

router.get('/:notebookID/notes', (req, res) => {
  res.send('get all notes in :notebookID')
})

router.delete('/:notebookID/notes/:noteID', (req, res) => {
  res.send('get :noteID in :notebookID')
})

router.post('/:notebookID/notes', (req, res) => {
  res.send('create :noteID in :notebookID')
})

router.patch('/:notebookID/notes/:noteID', (req, res) => {
  res.send('pudate :noteID in :notebookID')
})


export default router
