const express = require('express');
const router = express();

const usersRoute = require('./users.route')

router.get('/', (req, res) => {
    return res.send('Backend for Hiring Job App - ARRAY')
})

router.use('/users', usersRoute)

module.exports = router;