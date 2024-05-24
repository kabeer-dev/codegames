const express = require('express')
const router = express.Router()
const fs = require('fs')
const { verifyToken } = require("../middlewares/verifyToken");

fs.readdirSync(__dirname).forEach(function (file) {
    if (file === 'index.js') return
    var name = file.substring(0, file.indexOf('.'));
    if (name === 'admin') {
        router.use('/' + name, verifyToken, require('./' + name))
    } else if (name === 'account') {
        router.use('/' + name, verifyToken, require('./' + name))
    } else {
        router.use('/' + name, require('./' + name));
    }
})

module.exports = router;