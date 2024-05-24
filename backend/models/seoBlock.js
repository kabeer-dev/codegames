const mongoose = require('mongoose');

const seoBlockSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    sort: {
        type: Number
    },
    image: {
        type: String
    },
}, {timestamps: true});

const SeoBlock = new mongoose.model('SeoBlock', seoBlockSchema, 'seo_blocks');

module.exports = SeoBlock;