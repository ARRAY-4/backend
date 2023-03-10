const express = require("express");
const router = express();

const validationUser = require("../middleware/validation-user");
const validationCompany = require("../middleware/validation-company");
//import controller
const authController = require("../controllers/auth.controller.js");

router.post("/login-user", authController.loginuser);
router.post("/login-company", authController.logincompany);

router.post("/regis-user", validationUser.users, authController.registeruser);
router.post(
    "/regis-company",
    validationCompany,
    authController.registercompany
);

//contoh menampilkan data
//router.get("/", (req, res) => {return res.send(`hallo`)});

module.exports = router;
