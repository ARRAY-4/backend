const { check, validationResult } = require("express-validator");
//const authController = require("../controller/auth.controller");
//const authModel = require("../model/auth.model");
//const { options } = require("../route");

// USERS VALIDATION
const rulesAuth = [
  check("admin_company")
    .notEmpty()
    .withMessage("user company cannot empty")
    .trim()
    .escape(),

  check("email")
    .notEmpty()
    .withMessage("email cannot empty")
    .isEmail()
    .normalizeEmail()
    .withMessage("must email format")
    .trim()
    .escape(),

  check("company")
    .notEmpty()
    .withMessage("company name cannot empty")
    .trim()
    .escape(),
  check("field")
    .notEmpty()
    .withMessage("company field cannot empty")
    .trim()
    .escape(),
  check("phone")
    .notEmpty()
    .withMessage("phone cannot empty")

    //.isMobilePhone("id-ID")//untuk indonesia
    .isMobilePhone("id-ID")
    .withMessage("must phone number")
    .trim()
    .escape(),
  check("password")
    .notEmpty()
    .withMessage("password cannot empty")

    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage("Password must Strong and min 8 char")
    .trim()
    .escape(),
];
// RESPONSE AND CONDITION
const validation = [
  //Rules
  rulesAuth,

  //Response
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
  },
];

module.exports = validation;
