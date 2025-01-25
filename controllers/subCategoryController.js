const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');
const Item = require('../models/Item');
const { catchAsync, AppError } = require('../middleware/errorHandler');

exports.createSubCategory = catchAsync(async (req, res, next) => {
    const { category, ...subCategoryData } = req.body;

    // to check if category exists
    const existingCategory = await Category.findById(category);
    if(!existingCategory){
        return next(new AppError('Existing Category not found', 404));
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
});

exports.getAllSubCategories = catchAsync(async (req, res, next) => {
    const subCategories = await SubCategory.find()
        .populate('category')
        .populate('items');

    res.status(200).json({
        status: 'success',
        count: subCategories.length,
        data: subCategories
    });
});

exports.getSubCategoriesByCategory = catchAsync(async (req, res, next) => {
    const subCategories = await SubCategory.find({ category: req.params.categoryId })
        .populate('category')
        .populate('items');

    res.status(200).json({
        status: 'success',
        count: subCategories.length,
        data: subCategories
    });
});

exports.getSubCategoryById = catchAsync(async (req, res, next) => {
    const subCategory = await SubCategory.findById(req.params.id)
        .populate('category')
        .populate('items');

    if(!subCategory){
        return next(new AppError('SubCategory not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: subCategory
    });
});

exports.getSubCategoryByName = catchAsync(async (req, res, next) => {
    const subCategory = await SubCategory.findOne({ name: req.params.name })
        .populate('category')
        .populate('items');
      
    if (!subCategory) {
        return next(new AppError('SubCategory not found', 404));
    }
      
    res.status(200).json({
        status: 'success',
        data: subCategory
    });
});

exports.updateSubCategory = catchAsync(async (req, res, next) => {
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if(!updatedSubCategory){
        return next(new AppError('SubCategory not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: updatedSubCategory
    });
});

exports.deleteSubCategory = catchAsync(async (req, res, next) => {
    // find the subcategory
    const  subCategory = await SubCategory.findById(req.params.id);

    if(!subCategory){
        return next(new AppError('Category not found', 404));
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
});