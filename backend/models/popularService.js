const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    customPrice: { type: Number, default: 0 }
}, { _id: false });

const popularServiceSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
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
    isHot: {
        type: Boolean,
        default: false
    },
    products: [productSchema],
}, {timestamps: true});

const PopularService = new mongoose.model('PopularService', popularServiceSchema, 'popular_services');

module.exports = PopularService;