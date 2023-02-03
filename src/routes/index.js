const express = require("express");
const router = express();

const authRoute = require("./auth.route");
const usersRoute = require('./users.route');
const usersPortfolio = require('./usersPortfolio.route')
const usersExperiences = require('./usersExperiences.route')
const usersSkills = require('./usersSkills.route.js')
const companyRoute = require("./company.route");

router.get('/', (req, res) => {
    return res.send('Backend for Hiring Job App - ARRAY')
})

router.use("/auth", authRoute);
router.use('/users', usersRoute);
router.use('/users-portfolio', usersPortfolio)
router.use('/users-experiences', usersExperiences)
router.use('/users-skills', usersSkills)
router.use("/company", companyRoute);

module.exports = router;
