const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const multer = require('multer');


const upload = multer({ dest: 'uploads/' });
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

router.post('/upload', upload.single('image'), itemController.uploadImage);

module.exports = router;
