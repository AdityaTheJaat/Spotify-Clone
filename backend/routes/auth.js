const express = require('express')
const router = express.Router()
const { signup, login, logout } = require('../controllers/Auth')
const passport = require('passport')

router.post('/register', signup)
router.post('/login', login)
router.post('/logout', passport.authenticate("jwt", {session:false}), logout)

module.exports = router