const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String, 
    },
    telegramUrl: {
        type: String, 
    },
    facebookUrl: {
        type: String, 
    },
    discordUrl: {
        type: String, 
    },
    description: {
        type: String, 
    },
    keyFeatures: {
        type: Array
    },
    coverImage: {
        type: String
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product',
        name: {
            type: String
        },
        originalName: {
            type: String
        }
    }]
},{timestamps: true})

const News = mongoose.model('News', newsSchema)

module.exports = News