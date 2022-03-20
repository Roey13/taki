const itemsService = require('./items.service')
const logger = require('../../services/logger.service')

async function getItems(req, res) {
    try {
        const items = await itemsService.query()
        res.send(items)
    } catch (err) {
        logger.error('Failed to get items', err)
        res.status(500).send({ err: 'Failed to get items' })
    }
}

async function updateItem(req, res) {
    const itemToSave = req.body
    try {
        const item = await itemsService.updateItem(itemToSave)
        res.send(item)
    } catch (err) {
        logger.error('Failed to update item', err)
        res.status(500).send({ err })
    }
}

async function createItem(req, res) {
    const itemToSave = req.body
    try {
        const item = await itemsService.createItem(itemToSave)
        res.send(item)
    } catch (err) {
        logger.error('Failed to save item', err)
        res.status(500).send({ err })
    }
}

async function removeItem(req, res) {
    const { itemId } = req.params
    try {
        await itemsService.removeItem(itemId)
    } catch (error) {
        logger.error('Failed to save item', err)
        res.status(500).send({ err })
    }
}

module.exports = {
    getItems,
    updateItem,
    createItem,
    removeItem
}