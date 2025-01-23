const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Item = require('../models/Item');

exports.createCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        const savedCategory = await newCategory.save();

        res.status(201).json({
            status: 'success',
            data: savedCategory
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
            .populate('subCategories')
            .populate('items');

        res.status(200).json({
            status: 'success',
            count: categories.length,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
            .populate('subCategories')
            .populate('items');

        if(!category){
            return res.status(404).json({
                status: 'error',
                message: 'Category not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: category
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.getCategoryByName = async (req, res) => {
    try {
        const category = await Category.findOne({ name: req.params.name })
            .populate('subCategories')
            .populate('items');

        if(!category){
            return res.status(404).json({
                status: 'error',
                message: 'Category not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: category
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if(!updatedCategory){
            return res.status(404).json({
                status: 'error',
                message: 'Category not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: updatedCategory
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        // find the category
        const category = await Category.findById(req.params.id);

        if(!category){
            return res.status(404).json({
                status: 'error',
                message: 'Category not found'
            });
        }

        // delete associated subcategories
        await SubCategory.deleteMany({ category: req.params.id });

        // delete associated items
        await Item.deleteMany({ category: req.params.id });

        //delete the category
        await Category.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'Category and associated data deleted'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};