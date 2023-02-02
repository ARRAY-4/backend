const express = require('express');
const router = express();

const authRoute = require("./auth.route");
const usersRoute = require('./users.route');
const usersPortfolio = require('./usersPortfolio.route.js')

router.get('/', (req, res) => {
    return res.send('Backend for Hiring Job App - ARRAY')
})

router.use("/auth", authRoute);
router.use('/users', usersRoute);
router.use('/users/portfolio', usersPortfolio)

module.exports = router;