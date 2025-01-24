const Item = require('../models/Item');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const { catchAsync, AppError } = require('../middleware/errorHandler');

exports.createItem = catchAsync(async (req, res, next) => {
    const { category, subCategory, ...itemData } = req.body;

    // validate category or subbcategory
    if(!category && !subCategory){
        return next(new AppError('Item must belong to either category or subcategory', 404));
    }

    // validate category if provided
    if(category){
        const existingCategory = await Category.findById(category);
        if(!existingCategory){
            return next(new AppError('Category not found', 404));
        }
    }

    //validate subcategory if provided
    if(subCategory){
        const existingSubcategory = await SubCategory.findById(subCategory);
        if(!existingSubcategory){
            return next(new AppError('SubCategory not found', 404));
        }
    }

    // calculate total amount
    const totalAmount = itemData.baseAmount - (itemData.discount || 0);

    // create item
    const newItem = new Item({
        ...itemData,
        category,
        subCategory,
        totalAmount
    });

    const savedItem = await newItem.save();

    // update category or subcategory with new items
    if(category){
        await Category.findByIdAndUpdate(category, {
            $push: { items: savedItem._id }
        });
    }
    if(subCategory){
        await SubCategory.findByIdAndUpdate(subCategory, {
            $push: { items: savedItem._id }
        });
    }

    res.status(201).json({
        status: 'success',
        data: savedItem
    });
});

exports.getAllItems = catchAsync(async (req, res, next) => {
    const items = await Item.find()
        .populate('category')
        .populate('subCategory');

    res.status(200).json({
        status: 'success',
        count: items.length,
        data: items
    });
});

exports.getItemByCategory = catchAsync(async (req, res, next) => {
    const items = await Item.find({ category: req.params.categoryId })
        .populate('category')
        .populate('subCategory');

    res.status(200).json({
        status: 'success',
        count: items.length,
        data: items
    });
});

exports.getItemsBySubcategory = catchAsync(async (req, res, next) => {
    const items = await Item.find({ subCategory: req.params.subCategoryId })
        .populate('category')
        .populate('subCategory');

    res.status(200).json({
        status: 'success',
        count: items.length,
        data: items
    });
});

exports.getItemsById = catchAsync(async (req, res, next) => {
    const item = await Item.findById(req.params.id)
        .populate('category')
        .populate('subCategory');

    if(!item){
        return next(new AppError('Item not found', 404)); 
    }

    res.status(200).json({
        status: 'success',
        data: item
    });
});

exports.searchItemsByName = catchAsync(async (req, res, next) => {
    const items = await Item.find({ 
        name: { $regex: req.params.name, $options: 'i'}
    })
    .populate('category')
    .populate('subCategory');

    res.status(200).json({
        status: 'success',
        count: items.length,
        data: items
    });
});

exports.updateItem = catchAsync(async (req, res, next) => {
    const { baseAmount, discount, ...otherData } = req.body;

    // calculate total amount if base amount or discount is provided
    const updateData = {
        ...otherData,
        ...(baseAmount && { baseAmount }),
        ...(discount !== undefined && { discount }),
        ...(baseAmount || discount !== undefined) && {
            totalAmount : (baseAmount || req.body.baseAmount) - (discount || req.body.discount || 0)
        }
    };

    const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
    );

    if(!updatedItem){
        return next(new AppError('Item not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: updatedItem
    });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
    // find the item
    const item = await Item.findById(req.params.id);

    if(!item){
        return next(new AppError('Category not found', 404));
    }

    // remove item from category or subcategory
    if(item.category){
        await Category.findByIdAndDelete(item.category, {
            $pull: { items: req.params.id }
        });
    }

    if(item.subCategory){
        await SubCategory.findByIdAndDelete(item.subCategory, {
            $pull: { items: req.params.id }
        });
    }

    // delete the item
    await Item.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: 'success',
        message: 'Item deleted'
    })
});

