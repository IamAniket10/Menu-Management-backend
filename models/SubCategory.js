const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    taxApplicable: {
        type: Boolean,
        default: false
    },
    Tax: {
        type: Number,
        default: 0
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]
}, { timestamps: true });

const SubCategory = mongoose.model('SubCategory', SubCategorySchema);

module.exports = SubCategory;