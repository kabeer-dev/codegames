const { validationResult } = require("express-validator");
const { handleError } = require("../utils/responses");

exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(res, "Validation errors", 422, errors.array());
  }
  next()
};
