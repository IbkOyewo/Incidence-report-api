const { getUser, fetchWeather } = require('../services')
const { validateToken, generateToken, generateResetToken} = require("../utils")

const checkUser = (type) => async(req, res, next) => {
    try {
        const { body: { email } } = req
        const [ user ] = await getUser(email)
        if(type === 'login'){
           if(!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid credentials',
                data: []
            })
           }else {
            req.user = user
            return next()
           }
        }
        if (user) {
            return res.status(400).json({
                status: 'fail',
                message: 'User already exists. Log in',
                data: []
            })
        }
        return next()
    } catch(error){
        return next(error);
    }
}


// verify token
const verifyToken = (type) => async(req, res, next) => {
    try {
        let token
        if(type === 'logged-in') {
            token = req.headers['x-access-token']
        } else {
            token = req.query.token
        }

        if (!token)
            return res.status(403).json({
                status: 'fail',
                message: 'No token provided.'
            })
        
        const tokenValidated = await validateToken(token, type)
        if(tokenValidated.message) {
            return res.status(403).json({
                status: 'fail',
                message: tokenValidated.message
            })
        }        
        const { email, id } = tokenValidated
        const [user] = await getUser(email)

        if (!user) {
            return res.status(403).json({
                status: 'fail',
                message: 'Failed to authenticate token.'
            })
        }

        delete user.password;
        req.user = user
        return next()
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
        const { body: {city, country} } = req;
        const weather = await fetchWeather(city, country)
    
        if (!weather) 
            return res.status(404).json({
                status: 'failed',
                message: 'Could not fetch weather for city and country'
            })
        req.weather = weather.data
        next()
    }
    catch (err) {
        next(err)
    }
}

const generateResetPasswordToken = async(req, res, next) => {
    try {
        const { body: {email} } = req;
        const [user] = await getUser(email)
    
        if (!user) 
            return res.status(404).json({
                status: 'failed',
                message: 'User not found'
            })

        const token = await generateResetToken(user)
        req.token = token
        next()
    }
    catch (err) {
        next(err)
    }
}

const resetPassword = async(req, res, next) => {
    try {
        
    } catch (error) {

        
    }
}

module.exports = {
    validateUser,
    getWeatherReport,
    verifyToken,
    checkUser,
    generateResetPasswordToken,
    
}