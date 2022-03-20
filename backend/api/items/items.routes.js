const express = require('express')
const itemsController = require('./items.controller')
const router = express.Router()

router.get('/', itemsController.getItems)
router.post('/', itemsController.createItem)
router.put('/', itemsController.updateItem)
router.delete('/:itemId', itemsController.removeItem)

module.exports = router