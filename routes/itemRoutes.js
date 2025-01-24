const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { validateItem } = require('../middleware/validation');

// create a new item
router.post('/', validateItem, itemController.createItem);

// get all items
router.get('/', itemController.getAllItems);

// get items by category
router.get('/category/:categoryId', itemController.getItemByCategory);

// get items by subcategory
router.get('/subcategory/:subCategoryId', itemController.getItemsBySubcategory);

// get items by ID
router.get('/:id', itemController.getItemsById);

// get items by name
router.get('/search/:name', itemController.searchItemsByName);

// edit an item
router.put('/:id', validateItem, itemController.updateItem);

// delete an item
router.delete('/:id', itemController.deleteItem);

module.exports = router;