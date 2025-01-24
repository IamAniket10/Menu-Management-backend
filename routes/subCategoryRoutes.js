const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryController');
const { validateSubCategory } = require('../middleware/validation');

// create new subcategory
router.post('/', validateSubCategory, subCategoryController.createSubCategory);

// get all subcategories
router.get('/', subCategoryController.getAllSubCategories);

// get subcategories under specific category
router.get('/category/:categoryId', subCategoryController.getSubCategoriesByCategory);

// get subcategory by ID
router.get('/:id', subCategoryController.getSubCategoryById);

// get subcategory by name
router.get('/name/:name', subCategoryController.getSubCategoryByName);

// Edit a subcategory
router.put('/:id', validateSubCategory, subCategoryController.updateSubCategory);

//Delete a subcategory
router.delete('/:id', subCategoryController.deleteSubCategory);

module.exports = router;