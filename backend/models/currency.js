const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true  
    },
    sort: {
        type: Number,
        require: true
    }
},{timestamps: true})

const Currency = mongoose.model('Currency', currencySchema)

module.exports = Currency