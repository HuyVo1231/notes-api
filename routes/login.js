const express = require('express')
const router = express.Router()
const loginController = require('../app/controller/LoginController')
const authenticateToken = require('../utilities').authenticateToken

router.post('/create-account', loginController.createAccount)
router.post('/login', loginController.login)
router.get('/get-user', authenticateToken, loginController.getUser)

module.exports = router
