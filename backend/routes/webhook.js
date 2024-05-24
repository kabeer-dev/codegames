const express = require('express')
const router = express.Router()
const {
    productUpdate,
    UpdateOrderStatus,
    CompleteOrderStatus,
    updateCheckoutEndPoint,
    callBack
} = require('../controllers/webhook')

//Kinguin webhooks
router.post(
    '/update-product',
    productUpdate
);

router.post(
    '/update-status',
    UpdateOrderStatus
);

router.post(
    '/order-completed',
    CompleteOrderStatus
);

//TazaPay webhhook
router.post(
    '/update-checkout-end-point',
    updateCheckoutEndPoint
);

//city pay check
router.post(
    '/callback',
    callBack
);

module.exports = router