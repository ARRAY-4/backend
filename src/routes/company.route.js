const express = require("express");
const router = express();
// import controller
const companyController = require("../controllers/company.controller");
const formUpload = require("../../helper/formUpload");

router.get("/", companyController.get);
router.get("/:id", companyController.detail);
router.post("/", formUpload.single("img_company"), companyController.add); //post untuk admin jika mau membuat company tanpa register
router.patch(
  "/:id",
  formUpload.single("img_company"),
  companyController.update
);
router.delete("/:id", companyController.remove);

module.exports = router;
