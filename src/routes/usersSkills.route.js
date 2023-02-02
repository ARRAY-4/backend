const express = require('express');
const router = express();

// import controller
const usersSkills = require('../controllers/usersSkills.controller.js')

router.get('/', usersSkills.read)
router.get('/:id', usersSkills.readDetail)
router.post('/', usersSkills.create)
router.patch('/:id', usersSkills.update)
router.delete('/:id', usersSkills.remove)

module.exports = router