const express = require("express");
const router = express();
// import controller
const hireController = require("../controllers/hire.controller");

//router.get("/", hireController.get);
router.get("/", hireController.detail);
router.post("/:id", hireController.add); //id untuk login company
//router.patch("/:id", hireController.update);
router.delete("/:id", hireController.remove);

module.exports = router;
