const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');
const Item = require('../models/Item');

exports.createSubCategory = async (req, res) => {
    try {
        const { category, ...subCategoryData } = req.body;

        // to check if category exists
        const existingCategory = await Category.findById(category);
        if(!existingCategory){
            return res.status(404).json({
                status: 'error',
                message: 'Category not found'
            });
        }

        // create subcategory
        const newSubCategory = new SubCategory({
            ...subCategoryData,
            category: category
        });

        const savedSubCategory = await newSubCategory.save();

        // update category in new subcategory
        await Category.findByIdAndUpdate(category, {
            $push: { subCategories: savedSubCategory._id} 
        });

        res.status(201).json({
            status: 'success',
            data: savedSubCategory
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            mesasge: error.mesasge
        });
    }
};

exports.getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find()
            .populate('category')
            .populate('items');

        res.status(200).json({
            status: 'success',
            count: subCategories.length,
            data: subCategories
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.mesasge
        });
    }
}

exports.getSubCategoriesByCategory = async (req, res) => {
    try {
        const subCategories = await SubCategory.find({ category: req.params.categoryId })
            .populate('category')
            .populate('items');

        res.status(200).json({
            status: 'success',
            count: subCategories.length,
            data: subCategories
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.mesasge
        });
    }
};

exports.getSubCategoryById = async (req, res) => {
    try {
        const SubCategory = await SubCategory.findById(req.params.id)
            .populate('category')
            .populate('items');

        if(!SubCategory){
            return res.status(404).json({
                status: 'error',
                message: 'SubCategory not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: SubCategory
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.mesasge
        });
    }
};

exports.getSubCategoryByName = async (req, res) => {
    try {
      const subCategory = await SubCategory.findOne({ name: req.params.name })
        .populate('category')
        .populate('items');
      
      if (!subCategory) {
        return res.status(404).json({
          status: 'error',
          message: 'Subcategory not found'
        });
      }
      
      res.status(200).json({
        status: 'success',
        data: subCategory
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
};

exports.updateSubCategory = async (req, res) => {
    try {
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if(!updatedSubCategory){
            return res.status(404).json({
                status: 'error',
                message: 'Subcategory not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: updatedSubCategory
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.mesasge
        });
    }
};

exports.deleteSubCategory = async (req, res) => {
    try {
        // find the subcategory
       const  subCategory = await SubCategory.findById(req.params.id);

       if(!subCategory){
        return res.status(404).json({
            status: 'error',
            message: 'Subcategory not found'
        });
       }

       // delete associated items
       await Item.deleteMany({ subCategory: req.params.id });

       // remove subcategory from parent category
       await Category.findByIdAndUpdate(subCategory.category, {
        $pull: { subCategories: req.params.id }
       });

       // delete the subcategory
       await SubCategory.findByIdAndDelete(req.params.id);

       res.status(200).json({
        status: 'success',
        mesasge: 'Subcategory and associated items deleted'
       });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};