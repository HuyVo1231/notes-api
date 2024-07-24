const express = require('express')
const router = express.Router()
const noteController = require('../app/controller/NoteController')

const authenticateToken = require('../utilities').authenticateToken

// get all notes
router.get('/get-all-notes', authenticateToken, noteController.getAllNotes)
router.post('/add-note', authenticateToken, noteController.addNote)
router.put('/edit-note/:noteId', authenticateToken, noteController.editNote)
router.delete(
  '/delete-note/:noteId',
  authenticateToken,
  noteController.deleteNote
)

// update pinned note
router.put(
  '/update-note-pinned/:noteId',
  authenticateToken,
  noteController.updatePinnedNote
)

// Searchnote
router.get('/search-notes/', authenticateToken, noteController.searchNotes)

module.exports = router
