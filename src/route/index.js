const express = require('express')
const router = express.Router()
const { validateUser, getWeatherReport, verifyToken, checkUser, generateResetPasswordToken } = require('../middleware')
const { createNewUser, loginUser, forgotPassword, resetPassword } = require('../controller/index')
const { createIncidentReport, fetchAllIncidents, fetchUserIncidents } = require('../controller/incident')
const { createUserSchema, loginUserSchema, createIncidentSchema, forgotPasswordSchema, resetPasswordSchema } = require('../validation')


router.post(
    '/api/create-user',
    validateUser(createUserSchema, 'body'),
    checkUser('signup'),
    createNewUser
)

router.post(
    '/api/login-user',
    validateUser(loginUserSchema, 'body'),
    checkUser('login'),
    loginUser
 )

router.post(
    '/api/user-incident-report',
    verifyToken('logged-in'),
    validateUser(createIncidentSchema, 'body'),
    getWeatherReport,
    createIncidentReport
)

router.get(
    '/api/incident-reports',
    fetchAllIncidents
)

router.get(
    '/api/user-incident-report',
    verifyToken('logged-in'),
    fetchUserIncidents
)

router.post(
    '/api/forgot-password',
    validateUser(forgotPasswordSchema, 'body'),
    generateResetPasswordToken, 
    forgotPassword 
)

router.post(
    '/api/reset-password',
    validateUser(resetPasswordSchema, 'body'),
    verifyToken('reset-password'),
    resetPassword
        
)

module.exports = router