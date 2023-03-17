const express = require("express");
const router = express();
// import controller
const companyController = require("../controllers/company.controller");
// const formUpload = require("../middleware/formUpload");
const formUploadOnline = require('../middleware/formUploadOnline')

router.get("/", companyController.get);
router.get("/:id", companyController.detail);
router.post("/", formUploadOnline.single("img_company"), companyController.add); //post untuk admin jika mau membuat company tanpa register
router.patch(
  "/:id",
  formUploadOnline.single("img_company"),
  companyController.update
);
router.delete("/:id", companyController.remove);

module.exports = router;
