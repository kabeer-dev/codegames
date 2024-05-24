const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    // sort: {
    //     type: Number
    // },
    bannerImage: {
        type: String,
        require: true
    },
    smallScreenBannerImage: {
        type: String,
        require: true
    },
    regions: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Region'
    }]
}, { timestamps: true })

const Banner = mongoose.model('Banner', bannerSchema)

module.exports = Banner