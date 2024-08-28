const express = require('express');
const { register, Login, forgotPassword, resetPassword, isActivation } = require('../../services/authentication/auth');
const routes = express.Router()


// sign up api 
routes.post('/register', register)
// login api 
routes.post('/login', Login)
// forgot password 
routes.post('/forgot-password', forgotPassword)
// reset password
routes.post('/reset-password/:id/:token', resetPassword)
// activation link
routes.post('/activate', isActivation)

module.exports = routes