
const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        require: true
    },
    status: {
        type: String
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId, ref: 'User'
    // },
    userEmail: {
        type: String
    },
    // product: {
    //     type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    // }
}, { timestamps: true })

const Transaction = new mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;