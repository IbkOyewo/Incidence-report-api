const db = require('../db')
const queries = require('../db/queries/index')
const { hashPassword, comparePassword, generateToken } = require('../utils')
const axios = require('axios').default

const createUser = async(body) => {
    const { firstName, lastName, email, password } = body
    const encryptedPassword = await hashPassword(password)

    const payload = [ firstName, lastName, email, encryptedPassword ]
    return db.one(queries.addNewUser, payload)
}

const validatePassword = async(user, password) => {
    const isValid = await comparePassword(password, user.password)

    if (isValid) {
        const token = await generateToken(user)
        return { token }
    }
    return false
}

// getting user
const getUser = email => db.any(queries.getUser, email)

// Fetch weather data from api
const fetchWeather = async(city, country) => {
    const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ city },${ country }&appid=${ process.env.WEATHER_API_KEY }`)

    if (weather)
        return weather

    return false
}

// Creating report
const createReport = (req) => {
    const { body, id, weather } = req
    const { incident_description, city, country } = body

    const payload = [ id, incident_description, city, country, weather ]

    return db.one(queries.addIncidentReport, payload)
}

// Getting all incidents
const getAllIncidents = () => db.any(queries.getIncidents)

// Getting individual incidents
const getUserIncident = id => db.any(queries.getUserIncidents, id)

module.exports = {
    createUser,
    validatePassword,
    getUser,
    fetchWeather,
    createReport,
    getAllIncidents,
    getUserIncident
}