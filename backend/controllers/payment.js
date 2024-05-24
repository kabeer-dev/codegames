const axios = require('axios');
const express = require('express')
const { handleResponse, handleError } = require('../utils/responses')
const Payment = require('../models/payment');
const Order = require('../models/order');

//Tazapay
exports.createTazapaySession = async (req, res) => {
  const body = req.body;
  const options = {
    method: 'POST',
    url: `${process.env.TAZAPAY_API_URL}/v3/checkout`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Basic ${process.env.TAZAPAY_BASE64_KEY}`
    },
    data: {
      customer_details: { name: body.name, email: body.email, country: body.country },
      invoice_currency: body.invoice_currency,
      amount: (body.amount * 100).toFixed(2),
      transaction_description: body.transaction_description,
      payment_methods: ['card'],
      webhook_url: `${process.env.NODE_SERVER_URL}/api/v1/webhook/update-checkout-end-point`,

    }
  }
  axios.request(options).then(async (response) => {
    if (response.data.status === 'success') {
      const data = response.data.data;
      const newPayment = await Payment.create({
        paymentId: data.id,
        name: "TazaPay",
        amount: data.amount,
        amountPaid: data.amount_paid,
        customerId: data.customer,
        paymentStatus: data.payment_status,
        token: data.token,
        product: body.productId,
        userEmail: body.email
      })
      handleResponse(res, { token: response.data.data.token, pId: newPayment._id, mainUrl: response.data.data.url })
    }
  })
    .catch(function (error) {
      console.error(error);
    });
}

//Woopkassa
exports.createWoopkassaInvoice = async (req, res) => {
  const body = req.body;
  const woopkassaAuth = await axios.post(`${process.env.WOOPKASSA_API_URL}/v1/auth`, { "login": `${process.env.WOOPKASSA_LOGIN}`, "password": `${process.env.WOOPKASSA_PASSWORD}` });
  const woopkassaToken = woopkassaAuth.data.token;
  const newPayment = await Payment.create({
    name: "Woopkassa",
    amount: body.amount,
    amountPaid: 0,
    customerId: "",
    paymentStatus: "unpaid",
    product: body.productId,
    userEmail: body.email
  });
  const invoiceData = {
    reference_id: `${Date.now()}`,
    amount: body.amount, // Example amount
    // currency: "EUR",
    back_url: `${body.back_url}`,
    option: body.option, // Example option
    user_phone: body.user_phone,
    // Add more parameters as needed
  };
  const headers = {
    'Content-Type': 'application/json',
    'language': 'ru',
    'Time-Zone': 'Asia/Almaty',
    'Authorization': woopkassaToken
  };

  axios.post(`${process.env.WOOPKASSA_API_URL}/v1/invoice/create`, invoiceData, { headers })
    .then(async (response) => {
      const data = response.data.response;
      const newUpdatePayment = await Payment.updateOne(
        { _id: newPayment._id },
        {
          $set: {
            paymentId: data.operation_id,
          }
        }
      )
      handleResponse(res, { operational_url: response.data.operation_url, pId: newPayment._id })
    })
    .catch(error => {
      console.error('Error creating invoice:', error);
    });
}

exports.changeWoopkassaPaymentStatus = async (req, res) => {
  const body = req.body;
  const woopkassaAuth = await axios.post(`${process.env.WOOPKASSA_API_URL}/v1/auth`, { "login": `${process.env.WOOPKASSA_LOGIN}`, "password": `${process.env.WOOPKASSA_PASSWORD}` });
  const woopkassaToken = woopkassaAuth.data.token;
  const getPyayment = await Payment.findOne({ _id: body.pId });
  const headers = {
    'Content-Type': 'application/json',
    'language': 'ru',
    'Time-Zone': 'Asia/Almaty',
    'Authorization': woopkassaToken
  };

  axios.get(`${process.env.WOOPKASSA_API_URL}/v1/history/transaction/get-operations-data`, {
    data: {
      "operation_ids": [getPyayment.paymentId]
    },
    headers: headers
  }).then(async (response) => {
    if (response.data[0].status === 14) {
      const updatePayment = await Payment.updateOne(
        { _id: body.pId },
        {
          $set: {
            amountPaid: response.data[0].amount,
            paymentStatus: "paid"
          }
        }
      );
      handleResponse(res, { message: 'ok' })
    } else {
      handleResponse(res, { message: 'ok' })
    }
  })
}

//city pay check
exports.createCitypayPayment = async (req, res) => {
  const body = req.body;
  const response = await axios.post(`${process.env.CITYPAY_API_URL}/api/generateOrder`, {
    "customer_id": `${process.env.CITYPAY_CUSTOMER_ID}`,
    "access_token": `${process.env.CITY_CURRENCY_ACCESS_TOKEN}`,
    "order_id": Date.now() % 1000000,
    "order_token": Date.now() % 1000000,
    "amount": body.amount,
  });

  if (response.data.success === true) {
    const data = response.data.data;
    const newPayment = await Payment.create({
      paymentId: data.token,
      amount: body.amount,
      amountPaid: 0,
      paymentStatus: 'unpaid',
      product: body.productId,
      userEmail: body.email
    });

    handleResponse(res, { payment_url: data.payment_url, pId: newPayment._id })
  } else {
    handleError(res, { message: "Error in Server." })
  }

}

exports.updateCityPayPaymentStatus = async (req, res) => {
  const body = req.body;
  const getPyayment = await Payment.findOne({ _id: body.pId });
  if (getPyayment) {
    const response = await axios.get(`${process.env.CITY_PAY_ORDER_API_URL}/order/${getPyayment.paymentId}`);
    if (response.status === 200) {
      const data = response.data.data;
      // if(data.status.code === 'PAID' || data.status.code === 'UNCONFIRMED' || data.status.code === 'CONFIRMED'){
      // console.log(data.status.code)
      if (data.status.code === 'IN_PROGRESS') {    //for now beacuse there is no way to test payment 
        const response = await Payment.updateOne(
          {
            _id: body.pId,
          },
          {
            $set: {
              amountPaid: data.amountFiat,
              paymentStatus: 'paid'
            }
          }
        );
        handleResponse(res, { message: 'ok' })
      }
    }
  }
}

//overAll
exports.getPayemntData = async (req, res) => {
  const pId = req.query.pId;
  const paymentData = await Payment.findOne({ _id: pId }).populate('product');
  if (paymentData.name === 'Woopkassa') {
    if (paymentData.paymentStatus === "paid" && paymentData.ordered === false) {
      try {
        const response = await axios.post(`${process.env.KINGUIN_API_URL}/v2/order`,
          {
            products: [{
              productId: paymentData.product.productId,
              qty: 1,
              name: paymentData.product.name,
              price: paymentData.product.price
            }]
          },
          {
            headers: {
              'X-Api-Key': `${process.env.KINGUIN_API_KEY}`
            }
          });
        if (response.status === 201) {
          await Order.create({
            kinguinOrderId: response.data.orderId,
            status: response.data.status,
            requestTotalPrice: response.data.requestTotalPrice,
            totalPrice: response.data.totalPrice,
            paymentPrice: response.data.paymentPrice,
            storeId: response.data.storeId,
            userEmail: paymentData.userEmail,
            payment: paymentData._id,
            product: paymentData.product
          })
          await Payment.updateOne({ _id: paymentData._id }, { $set: { ordered: true } });
          return handleResponse(res, { payment_data: paymentData })
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      return handleResponse(res, { payment_data: paymentData })
    }
  }
  if (paymentData.name === 'TazaPay') {  //for now testing
    handleResponse(res, { payment_data: paymentData })
  } else {
    handleError(res, { message: "Error in Payment" })
  }

}
