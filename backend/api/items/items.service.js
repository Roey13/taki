const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectID
const logger = require('../../services/logger.service')

const collectionName = 'ENTER COLLECTION NAME'

async function query() {
    try {
        const collection = await dbService.getCollection(collectionName)
        let waps = await collection.find().toArray()
        return waps
    } catch (err) {
        logger.error('Failed to get items', err)
        throw err
    }
}

async function createItem(iten) {
    try {
        const collection = await dbService.getCollection(collectionName)
        wap.isEdit = true
        wap.isPublic = false
        res = await collection.insertOne(wap)
        return res.ops
    } catch (err) {
        logger.error('Failed to create item', err)
        throw err
    }
}


async function updateItem(item) {
    const { _id } = item
    try {
        const collection = await dbService.getCollection(collectionName)
        await collection.updateOne({ '_id': ObjectId(_id) }, { $set: { ...item, _id: ObjectId(_id) } })
        return item;
    } catch (err) {
        logger.error('Failed to update item', err)
        throw err
    }
}

async function removeItem(itemId) {
    try {
        const collection = await dbService.getCollection(collectionName)
        await collection.removeOne({ _id: itemId })
    } catch (error) {
        logger.error('Failed to remove item', err)
        throw err
    }
}

module.exports = {
    query,
    updateItem,
    createItem,
    removeItem
}