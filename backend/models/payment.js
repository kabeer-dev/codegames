const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    paymentId: {
        type: String,
        require: true
    },
    name: {
        type: String
    },
    amount: {
        type: Number
    },
    amountPaid: {
        type: Number
    },
    customerId : {
        type: String
    },
    paymentStatus: {
        type: String
    },
    token: {
        type: String
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product',
    },
    userEmail: {
        type: String
    },
    ordered: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const Payment = new mongoose.model('Payment', paymentSchema);
module.exports = Payment;