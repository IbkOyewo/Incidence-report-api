const express = require('express')
const router = express.Router()
const { checkIfUserExistForLogin, checkIfUserRegister, getWeatherReport } = require('../middleware')
const { createNewUser, loginUser } = require('../controller/index')
const { createIncidentReport, fetchAllIncidents, fetchUserIncidents } = require('../controller/incident')

router.post('/api/create-user', checkIfUserRegister, createNewUser)
router.post('/api/login-user', checkIfUserExistForLogin, loginUser)
router.post('/api/user-incident_report/:id', getWeatherReport, createIncidentReport)
router.get('/api/incident-reports', fetchAllIncidents)
router.get('/api/user-incident-report/:id', fetchUserIncidents)

module.exports = router