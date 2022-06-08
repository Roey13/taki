const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('board')
        const boards = await collection.find(criteria).toArray()
        return boards
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }

}

async function getById(id) {
    try {
    const collection = await dbService.getCollection('board')
    const board = await collection.findOne({'_id':ObjectId(id)})
    return board
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err  
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const query = { _id: ObjectId(boardId) }
        await collection.deleteOne(query)
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}


async function save(board) {
    console.log('hi, im save from backend');
    const { title, createdAt, createdBy, style, labels, groups, activities, members } = board
    let savedBoard
    if (board._id) {
        //UPDATE
        try {
            savedBoard = {
                _id: ObjectId(board._id),
                title,
                createdAt,
                createdBy,
                style,
                labels,
                groups,
                activities,
                members
            }
            const collection = await dbService.getCollection('board')
            await collection.updateOne({ _id: savedBoard._id }, { $set: savedBoard })
            return savedBoard


        } catch (err) {
            logger.error('cannot update board', err)
            throw err
        }
    } else {
        try {
            savedBoard = { ...board }
            savedBoard.createdAt = new Date()
            savedBoard.activities = []
            savedBoard.createdBy = {}
            savedBoard.groups = []
            savedBoard.labels = []
            savedBoard.members = []
            const collection = await dbService.getCollection('board')
            await collection.insertOne(savedBoard)
            return savedBoard
        } catch (err) {
            logger.error('cannot add board', err)
            throw err
        }
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}

module.exports = {
    query,
    remove,
    getById,
    save
}


