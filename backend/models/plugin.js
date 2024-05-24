const mongoose = require('mongoose');

const pluginSchema = new mongoose.Schema({
    name: {
        type: String, 
    },
    enable: {
        type: Boolean,
        default: true 
    },
    KINGUIN_API_URL: {
        type: String
    },
    KINGUIN_API_KEY: {
        type: String
    },

    TAZAPAY_API_URL: {
        type: String
    },
    TAZAPAY_PUBLIC_KEY: {
        type: String
    },
    TAZAPAY_API_KEY: {
        type: String
    },
    TAZAPAY_API_SECRET_KEY: {
        type: String
    },
    TAZAPAY_BASE64_KEY: {
        type: String
    },

    WOOPKASSA_API_URL: {
        type: String
    },
    WOOPKASSA_LOGIN: {
        type: String
    },
    WOOPKASSA_PASSWORD: {
        type: String
    },

    CITYPAY_API_URL: {
        type: String
    },
    CITY_PAY_ORDER_API_URL: {
        type: String
    },
    CITYPAY_CUSTOMER_ID: {
        type: String
    },
    CITY_USD_ACCESS_TOKEN: {
        type: String
    },
},{timestamps: true})

const Plugin = mongoose.model('Plugin', pluginSchema)

module.exports = Plugin