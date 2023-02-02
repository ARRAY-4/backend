const express = require('express');
const router = express();

// import controller
const usersExperiences = require('../controllers/usersExperiences.controller.js')

router.get('/', usersExperiences.read)
router.get('/:id', usersExperiences.readDetail)
router.post('/', usersExperiences.create)
router.patch('/:id', usersExperiences.update)
router.delete('/:id', usersExperiences.remove)

module.exports = router