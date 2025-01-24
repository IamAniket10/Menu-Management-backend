const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Item = require('../models/Item');
const { catchAsync, AppError } = require('../middleware/errorHandler')

exports.createCategory = catchAsync(async (req, res, next) => {
    const newCategory = new Category(req.body);
        const savedCategory = await newCategory.save();

        res.status(201).json({
            status: 'success',
            data: savedCategory
        });
});

exports.getAllCategories = catchAsync(async (req, res, next) => {
    const categories = await Category.find()
        .populate('subCategories')
        .populate('items');

    res.status(200).json({
        status: 'success',
        count: categories.length,
        data: categories
    });
});

exports.getCategoryById = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.id)
        .populate('subCategories')
        .populate('items');

    if(!category){
        return next(new AppError('Category not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: category
    });
});

exports.getCategoryByName = catchAsync(async (req, res, next) => {
    const category = await Category.findOne({ name: req.params.name })
        .populate('subCategories')
        .populate('items');

    if(!category){
        return next(new AppError('Category not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: category
    });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if(!updatedCategory){
        return next(new AppError('Category not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: updatedCategory
    });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
    // find the category
    const category = await Category.findById(req.params.id);

    if(!category){
        return next(new AppError('Category not found', 404));
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
});