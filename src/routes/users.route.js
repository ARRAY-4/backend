const express = require('express');
const router = express();
// const validation = require('../middlewares/validation')

// import controller
const usersController = require('../controllers/users.controller.js')

router.get('/', usersController.read)
router.get('/:id', usersController.readDetail)
router.post('/', usersController.create)
router.patch('/:id', usersController.update)
router.delete('/:id', usersController.remove)

module.exports = router