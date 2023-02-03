// RYAN
// // express validator
// const { body, check, validationResult } = require('express-validator')
// const checkDuplicate = require('./checkDuplicate')

// // USERS
//     // RULES
//     const rulesUsers = [
//         check('full_name')
//             .notEmpty().withMessage('name cannot empty')
//             .trim()
//             .escape(),

//         check('email')
//             .notEmpty().withMessage('email cannot empty')
//             .trim()
//             .escape(),

//         body('email').custom(async value => {
//             const duplicateName = await checkDuplicate(value)
//             if (duplicateName) {
//                 throw new Error('email already registered!')
//             }
//             return true
//         }),

//         check('password')
//             .notEmpty().withMessage('password cannot empty')
//             .trim()
//             .escape(),

//         check('phone')
//             .notEmpty().withMessage('mobile number cannot empty')
//             .isNumeric().withMessage('mobile number must be a numeric')
//             .trim()
//             .escape(),
//     ]
//     // RESPONSE AND CONDITION
//     const users = [
//         //Rules
//         rulesUsers,

//         //Response
//         (req, res, next) => {
//             const errors = validationResult(req);

//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ errors: errors.array()[0].msg })
//             }
//             next();
//         }
//     ]

// module.exports = { users }

// RAYNO
const { check, validationResult } = require("express-validator");

// USERS VALIDATION
const rulesAuth = [
  check("fullname")
    .notEmpty()
    .withMessage("full name cannot empty")
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

  check("phone")
    .notEmpty()
    .withMessage("password cannot empty")

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
