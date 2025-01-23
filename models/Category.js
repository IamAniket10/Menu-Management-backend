const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    taxApplicable: {
        type: Boolean,
        default: false
    },
    tax: {
        type: Number,
        default: 0
    },
    taxType: {
        type: String,
        enum: ['precentage', 'flat'],
        default: 'percentage'
    },
    subCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    }],
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;