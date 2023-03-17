const express = require('express');
const router = express();
// const formUpload = require('../middleware/formUpload')
// const validation = require('../middleware/validation')
const formUploadOnline = require('../middleware/formUploadOnline')

// import controller
const usersController = require('../controllers/users.controller.js')

router.get('/', usersController.read)
router.get('/:id', usersController.readDetail)
router.post('/', formUploadOnline.single('img_profile'), usersController.create)
router.patch('/:id', formUploadOnline.single('img_profile'), usersController.update)
router.delete('/:id', usersController.remove)

module.exports = router