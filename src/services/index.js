const db = require('../db')
const queries = require('../db/queries/index')
const axios = require('axios').default

const createUser = (body) => {
    const { email, password, firstName, lastName } = body
    console.log(body)
    const payload = [ email, password, firstName, lastName ]
    return db.one(queries.addNewUser, payload)
}

// Validate user registration
const validateUserReg = (body) => {
    const { email, password, firstName, lastName } = body

    if (!(email && password && firstName && lastName))
    throw new Error('Ensure all fields are required')

    return true
}

// Validate user login
const validateUserLogin = (body) => {
    const { email, password } = body
    if (!(email && password))
    throw new Error('Ensure all fields are required')
    return true
}

// getting user
const getUser = email => db.any(queries.getUser, email)

const getUserById = id => db.any(queries.getUserById, id)

// Validate Report Input
const validateReportInput = async(body) => {
    const { incident_description, city, country } = body
    
    if (!(incident_description && city && country)) 
        throw new Error('Ensure all fields are required')

    return true
}

// Fetch weather data from api
const fetchWeather = async(city, country) => {
    const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ city },${ country }&appid=${ process.env.WEATHER_API_KEY }`)

    if (weather)
        return weather

    throw new Error('Could not get data of the city and country')
}

// Creating report
const createReport = (req) => {
    const { body, user_id, weather } = req
    const { incident_description, city, country } = body

    const payload = [ user_id, incident_description, city, country, weather ]

    return db.one(queries.addIncidentReport, payload)
}

// Getting all incidents
const getAllIncidents = () => db.any(queries.getIncidents)

// Getting individual incidents
const getUserIncident = id => db.any(queries.getUserIncidents, id)

module.exports = {
    createUser,
    validateUserReg,
    validateUserLogin,
    getUser,
    validateReportInput,
    fetchWeather,
    createReport,
    getAllIncidents,
    getUserIncident,
    getUserById
}