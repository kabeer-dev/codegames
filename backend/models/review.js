const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    rating: {
        type: Number
    },
    isVarified: {
        type: Boolean,
        default: true
    },
    message: {
        type: String
    },
    sort: {
        type: Number
    },
}, {timestamps: true});

const Review = new mongoose.model('Review', reviewSchema);

module.exports = Review;