const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    customPrice: { type: Number, default: 0 }
}, { _id: false });

const steamSchema = new mongoose.Schema({
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
    products: [productSchema],
}, {timestamps: true});

const Steam = new mongoose.model('Steam', steamSchema);

module.exports = Steam;