const { check, validationResult } = require("express-validator");

const validateParam = (req, res, next) => {
  return [check("email").isEmail(), check("password").isLength({ min: 6 })];
};
module.exports = { validateParam };
