const express = require("express");
const router = express();

const usersRoute = require("./users.route");
const authRoute = require("./auth.route");

const companyRoute = require("./company.route");
const hireRoute = require("./hire.route");

router.get("/", (req, res) => {
  return res.send("Backend for Hiring Job App - ARRAY");
});

router.use("/users", usersRoute);
router.use("/auth", authRoute);
router.use("/company", companyRoute);
router.use("/hire", hireRoute);
module.exports = router;
