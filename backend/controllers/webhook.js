const express = require('express');
const axios = require('axios');
const sendMail = require('../email/sendEmail');
const Product = require('../models/product');
const Payment = require('../models/payment');
const Order = require('../models/order');

//Kingin Webhooks 
exports.productUpdate = async (req, res) => {
    const body = req.body;
    const productAvailable = await Product.findOne({
        productId: body.productId
    });
    if (productAvailable) {
        await productAvailable.updateOne({
            $set: {
                kinguinId: body.kinguinId,
                qty: body.qty,
                textQty: body.textQty,
                price: body.price,
                cheapestOfferId: body.cheapestOfferId,
                kinguinUpdatedAt: body.updatedAt
            }
        })
    } else {
        const response = await axios.get(`${process.env.KINGUIN_API_URL}/v2/products/${body.productId}`, {
            headers: {
                'X-Api-Key': `${process.env.KINGUIN_API_KEY}`
            }
        });
        await Product.create(response.data)
    }
};

exports.UpdateOrderStatus = async (req, res) => {
    console.log('update-order', req.body)
};

exports.CompleteOrderStatus = async (req, res) => {
    console.log('complete-order', req.body)
    const data = req.body
    await Order.updateOne({ kinguinOrderId: data.orderId }, { $set: { status: 'Completed' } });
    const orderDetail = await Order.findOne({ kinguinOrderId: data.orderId })
    sendMail(orderDetail.userEmail)
};

//TazaPay Webhooks
exports.updateCheckoutEndPoint = async (req, res) => {
    const body = req.body;
    if (body.type === 'checkout.paid' && body.data.payment_status === 'paid') {
        await Payment.updateOne(
            { paymentId: body.data.id },
            {
                $set: {
                    amount: body.data.amount,
                    amountPaid: body.data.amount_paid,
                    paymentStatus: body.data.payment_status
                }
            }
        )
    }
}

//city pay check
exports.callBack = async (req, res) => {
    console.log('callback', req.body)
};
