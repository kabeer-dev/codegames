const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    customPrice: { type: Number, default: 0 }
}, { _id: false });

const fastCategorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    thumnailImage: {
        type: String
    },
    coverImages: {
        type: Array
    },
    singleProduct: {
        type: Boolean,
        default: true
    },
    products: [productSchema],
}, {timestamps: true});

const FastCategory = new mongoose.model('FastCategory', fastCategorySchema, 'fast_categories');

module.exports = FastCategory;