const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Route to create a new item
router.post('/items', itemController.createItem);

// Route to get all items
router.get('/items', itemController.getAllItems);

// Route to get a single item by ID
router.get('/items/:itemId', itemController.getItemById);

// Route to update an existing item by ID
router.put('/items/:itemId', itemController.updateItemById);

// Route to delete an item by ID
router.delete('/items/:itemId', itemController.deleteItemById);

module.exports = router;
