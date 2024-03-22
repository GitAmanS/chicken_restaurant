const Item = require('../models/itemModel');
const AWS = require('aws-sdk');
// Controller methods
const itemController = {
  // Create a new item
  createItem: async (req, res) => {
    try {
      const newItem = new Item(req.body);
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get all items
  getAllItems: async (req, res) => {
    try {
      const items = await Item.find();
      res.status(200).json(items);
    } catch (error) {
      console.error('Error getting items:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get a single item by ID
  getItemById: async (req, res) => {
    try {
      const item = await Item.findById(req.params.itemId);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(200).json(item);
    } catch (error) {
      console.error('Error getting item by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Update an existing item by ID
  updateItemById: async (req, res) => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(
        req.params.itemId,
        req.body,
        { new: true }
      );
      if (!updatedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(200).json(updatedItem);
    } catch (error) {
      console.error('Error updating item by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Delete an item by ID
  deleteItemById: async (req, res) => {
    try {
      const deletedItem = await Item.findByIdAndDelete(req.params.itemId);
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting item by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  uploadImage: async (req, res) => {
    const file = req.file;
    const uploadParams = {
      Bucket: 'your-bucket-name',
      Key: file.originalname,
      Body: file.buffer,
    };
  
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to upload image' });
      }
      console.log('Image uploaded successfully:', data.Location);
      res.json({ imageUrl: data.Location });
    });
  }
};



module.exports = itemController;
