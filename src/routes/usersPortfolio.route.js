// Imports
const express = require('express')
const router = express()
const usersPortfolio = require('../controllers/usersPortfolio.controller') 
const formUpload = require('../middleware/formUpload')

// Endpoint Product
router.get('/', usersPortfolio.read)
router.get('/:id', usersPortfolio.readDetail)
router.post('/', formUpload.array('img_portfolio'), usersPortfolio.create)
router.patch('/:id', formUpload.array('img_portfolio'), usersPortfolio.update)
router.delete('/:id', usersPortfolio.remove)

// Exports
module.exports = router