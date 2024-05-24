const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    flg: {
        type: String,
    },
    hot: {
        type: Boolean,
        default: false,
    },
    sort: {
        type: Number,
        require: true
    }
}, { timestamps: true });

const Region = mongoose.model('Region', regionSchema);
module.exports = Region;
