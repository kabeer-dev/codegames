
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    kinguinOrderId: {
        type: String,
        require: true
    },
    status: {
        type: String
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId, ref: 'User'
    // },
    requestTotalPrice: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    paymentPrice: {
        type: Number
    },
    storeId:{
        type: Number
    },
    userEmail: {
        type: String
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Payment'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    }
}, { timestamps: true })

const Order = new mongoose.model('Order', orderSchema);
module.exports = Order;