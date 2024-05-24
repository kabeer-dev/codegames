const mongoose = require('mongoose');

const dropdownItemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true 
    },
    displayName: {
        type: String,
        require: true 
    },
    isShow: {
        type: Boolean,
        default: true,
        require: true 
    },
    singleProduct: {
        type: Boolean,
        default: true,
        require: true 
    },
    sort :{
        type: Number,
    }
}, {timestamps: true});

const DropdownItem = new mongoose.model('DropdownItem', dropdownItemSchema, "dropdown_items");

module.exports = DropdownItem;