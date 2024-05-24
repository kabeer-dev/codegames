const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'test'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    // orders: [{
    //     type: mongoose.Schema.Types.ObjectId, ref: 'Order'
    // }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
