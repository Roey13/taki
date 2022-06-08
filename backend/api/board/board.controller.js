const boardService = require('./board.service')
const logger = require('../../services/logger.service') 
const socketService = require('../../services/socket.service')

async function getboards(req, res) {
    try {
        const boards = await boardService.query(req.query)
        res.send(boards)
    } catch (err) {
        logger.error('Cannot get boards', err)
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

async function getboardById (req, res) {
    const boardId = req.params.id
    try {
       const board = await boardService.getById(boardId)
        res.send(board)
    } catch (err) {
        logger.error('Cannot get board', err)
        res.status(500).send({ err: 'Failed to get board' })
    }
}

async function deleteboard(req, res){
    try {
        await boardService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
     } catch (err) {
         logger.error('Cannot delete board', err)
         res.status(500).send({ err: 'Failed to delete board' })
     }
}

async function addBoard(req, res) {
    console.log('!!!!!!!');
    try {
        const board = req.body
        savedBoard = await boardService.save(board)
        res.send(savedBoard)
    } catch (err) {
        console.log(err)
        logger.error('Failed to add board', err)
        res.status(500).send({ err: 'Failed to add board' })
    }
}

async function updateBoard(req, res) {
    console.log('!!!!!!!');
    try {
        const board = req.body
        savedBoard = await boardService.save(board)
        res.send(savedBoard)
    } catch (err) {
        console.log(err)
        logger.error('Failed to update board', err)
        res.status(500).send({ err: 'Failed to update board' })
    }
}

module.exports = {
    getboards,
    getboardById,
    deleteboard,
    addBoard,
    updateBoard
}