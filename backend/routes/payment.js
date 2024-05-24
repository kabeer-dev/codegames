const express = require('express')
const router = express.Router()
const { body } = require("express-validator");
const { validateRequest } = require('../middlewares/validateRequest');
const {
    createTazapaySession,
    createWoopkassaInvoice,
    changeWoopkassaPaymentStatus,
    getPayemntData,
    createCitypayPayment,
    updateCityPayPaymentStatus
} = require('../controllers/payment');

//TazaPay
router.post(
    '/create-tazapay-session',
    [
        body('name').notEmpty().withMessage('Name is Required'),
        body('email').notEmpty().withMessage('Email is Required'),
        body('country').notEmpty().withMessage('Country is Required'),
        body('invoice_currency').notEmpty().withMessage('Invoice Currency is Required'),
        body('amount').notEmpty().withMessage('Amount is Required'),
        body('transaction_description').notEmpty().withMessage('Transaction Description is Required'),
        body('productId').notEmpty().withMessage('Product Id is Required'),
    ],
    validateRequest,
    createTazapaySession
);

//Woopkassa
router.post(
    '/create-woopkassa-invoice',
    [
        body('amount').notEmpty().withMessage('Amount is Required'),
        body('back_url').notEmpty().withMessage('Back Url is Required'),
        body('option').notEmpty().withMessage('Option is Required'),
        body('user_phone').notEmpty().withMessage('User Phone is Required'),
    ],
    validateRequest,
    createWoopkassaInvoice
);

router.post(
    '/change-woopkassa-payment-status',
    [
        body('pId').notEmpty().withMessage('pId is Required')
    ],
    validateRequest,
    changeWoopkassaPaymentStatus
);

//City Pay check
router.post(
    '/create-citypay-payment',
    [
        body('amount').notEmpty().withMessage('Amount is Required'),
        body('productId').notEmpty().withMessage('Product Id is Required'),
        body('email').notEmpty().withMessage('Email Id is Required'),
    ],
    validateRequest,
    createCitypayPayment
)

router.post(
    '/update-citypay-payment-status',
    [
        body('pId').notEmpty().withMessage('pId Id is Required'),
    ],
    validateRequest,
    updateCityPayPaymentStatus
)

//overAll
router.get(
    '/get-payment-data',
    getPayemntData
)

module.exports = router