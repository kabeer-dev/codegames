const express = require("express");
const router = express.Router();
const { me } = require("../controllers/account.js");

router.get("/me", me);

module.exports = router;
