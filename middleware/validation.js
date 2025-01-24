const { body, validationResult } = require('express-validator');

// middleware to check validation results
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            status: 'error',
            errors: errors.array()
        });
    }
    next();
};

// validation middleware for category
exports.validateCategory = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),

    body('image')
        .trim()
        .notEmpty().withMessage('Image URL is required')
        .isURL().withMessage('Must be a valid URL'),

    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10, max: 500 }).withMessage('Description must be 10 and 500 characters'),
    
    body('taxApplicable')
        .optional()
        .isBoolean().withMessage('Tax Applicability must be a boolean'),

    body('tax')
        .optional()
        .isFloat({ min: 0 }).withMessage('Tax must be a non-negative number'),

    body('taxType')
        .optional()
        .isIn(['percentage', 'flat']).withMessage('Invalid tax type'),

    validateRequest
];


// validation middleware for subcategory
exports.validateSubCategory = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),

    body('image')
        .trim()
        .notEmpty().withMessage('Image URL is required')
        .isURL().withMessage('Must be a valid URL'),

    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10, max: 500 }).withMessage('Description must be 10 and 500 characters'),
    
    body('category')
        .notEmpty().withMessage('Category is required')
        .isMongoId().withMessage('Invvalid category ID'),

    body('taxApplicable')
        .optional()
        .isBoolean().withMessage('Tax Applicability must be a boolean'),

    body('tax')
        .optional()
        .isFloat({ min: 0 }).withMessage('Tax must be a non-negative number'),

    validateRequest
];


// validation middleware for Item
exports.validateItem = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),

    body('image')
        .trim()
        .notEmpty().withMessage('Image URL is required')
        .isURL().withMessage('Must be a valid URL'),

    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10, max: 500 }).withMessage('Description must be 10 and 500 characters'),
    
    body('category')
        .optional()
        .isMongoId().withMessage('Invvalid category ID'),

    body('subCategory')
        .optional()
        .isMongoId().withMessage('Invvalid subcategory ID'),

    body('taxApplicable')
        .optional()
        .isBoolean().withMessage('Tax Applicability must be a boolean'),

    body('tax')
        .optional()
        .isFloat({ min: 0 }).withMessage('Tax must be a non-negative number'),

    body('baseAmount')
        .notEmpty().withMessage('Base amount is required')
        .isFloat({ min: 0 }).withMessage('Base amount must be positive number'),

    body('discount')
        .optional()
        .isFloat({ min: 0 }).withMessage('Discount must be non-negative number'),

    
    // ensure either category or subcategory provided
    (req, res, next) => {
        const { category, subCategory } = req.body;
        if(!category && !subCategory){
            return res.status(400).json({
                status: 'error',
                message: 'Item must belong to either category or subcategory'
            });
        }
        next();
    },

    validateRequest
];