const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { validateCategory } = require('../middleware/validation');


//create a new category
router.post('/', validateCategory, categoryController.createCategory);

//get all categories
router.get('/', categoryController.getAllCategories);

// get a category by ID
router.get('/:id', categoryController.getCategoryById);

//get a category by name
router.get('/name/:name', categoryController.getCategoryByName);

//Edit a category
router.put('/:id', validateCategory, categoryController.updateCategory);

//delete a category
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;