const express = require('express')
const {getboards, getboardById, deleteboard, addBoard, updateBoard} = require('./board.controller')
const router = express.Router()

router.get('/', getboards)
router.get('/:id', getboardById)
router.post('/', addBoard)
router.put('/:id', updateBoard)
router.delete('/:id', deleteboard)


module.exports = router