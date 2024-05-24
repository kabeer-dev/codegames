const { handleResponse } = require("../utils/responses.js");

exports.me = (req, res) => {
  handleResponse(res, { user: req.user });
};
