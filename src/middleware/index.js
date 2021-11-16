const { getUser, fetchWeather } = require('../services')
const { validateToken } = require("../utils")

// const checkUserExists = (type) => async(req, res, next) => {
//     try {
//         const { body } = req
//         const { email } = body
//         const [ user ] = await getUser(email)

//         if (type === 'register') {
//             if (user) {
//                 return res.status(401).json({
//                     status: 'fail',
//                     message: 'User already exists. Log in',
//                     data: []
//                 })
//             }
    
//             next()
//         } else {
//             if (!user) {
//                 return res.status(401).json({
//                     status: 'fail',
//                     message: 'Invalid credentials',
//                     data: []
//                 })
//             }
    
//             req.user = user
//             req.password = body.password
//             next()
//         }
//     }
//     catch (err) {
//         next(err)
//     }
// }

const checkIfUserRegister = async(req, res, next) => {
    try {
        const { body: { email } } = req
        const [ user ] = await getUser(email)
        
        if (user) {
            return res.status(401).json({
                status: 'fail',
                message: 'User already exists. Log in',
                data: []
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

const checkIfUserExistForLogin = async(req, res, next) => {
    try {
        const { body } = req
        const { email } = body
        const [ user ] = await getUser(email)

        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials',
                data: []
            })
        }

        req.user = user
        req.password = body.password
        next()
    } catch (error) {
        next(error)
    }
}

// verify token
const verifyToken = async(req, res, next) => {
    try {
        var token = req.headers['x-access-token']
    
        if (!token)
            return res.status(403).json({
                status: 'fail',
                message: 'No token provided.'
            })
        
        const tokenValidated = await validateToken(token)
    
        if (!tokenValidated) 
            return res.status(403).json({
                status: 'fail',
                message: 'Failed to authenticate token.'
            })
        
        const { email, id } = tokenValidated
        const isAuthorized = await getUser(email)

        if (!isAuthorized) 
            return res.status(403).json({
                status: 'fail',
                message: 'Failed to authenticate token.'
            })
        req.authorizedUser = id
        next()
    }
    catch (err) {
        next(err)
    }
}

// Alternative
const validateUser = (data, type) => async (req, res, next) => {
    try {
        const getType = {
            body: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers
        };
        const options = {
        language: { key: '{{key}}'}
        }
        const result = getType[type]
        const isValid = await data.schema.validate(result, options);
        if(!isValid.error) {
            req[type] = isValid.value;
            return next()
        }
        const { message } = isValid.error.details[0];
        return res.status(400).json({
            status: 'fail',
            message: message.replace(/[\"]/gi,""),
            errors: data.message
        })
    } catch (error) {
        next(error)
    }
}

const getWeatherReport = async(req, res, next) => {
    try {
        const { body, authorizedUser } = req        
        const { city, country } = body

        const weather = await fetchWeather(city, country)
    
        if (!weather) 
            return res.status(404).json({
                status: 'failed',
                message: 'Could not fetch weather for city and country'
            })

        req.weather = weather.data
        req.id = authorizedUser
        next()
    }
    catch (err) {
        next(err)
    }
}
module.exports = {
    checkIfUserRegister,
    checkIfUserExistForLogin,
    // checkUserExists,
    validateUser,
    getWeatherReport,
    verifyToken
}