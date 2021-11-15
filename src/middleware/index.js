const { validateUserReg, validateUserLogin, getUser, fetchWeather, validateReportInput, getUserById } = require('../services/index')

const checkIfUserRegister = async(req, res, next) => {
    try {
        const { body } = req
        const validated = validateUserReg(body)

        if (validated) {
            const { email } = body
            const [ user ] = await getUser(email)
           
            if (user) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'User already exists. Log in',
                    data: []
                })
            }
    
            req.body = body
            next()
        }

    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
            data: []
        })
    }
}

const checkIfUserExistForLogin = async(req, res, next) => {
    try {
        const { body } = req
        const validated = validateUserLogin(body)

        if (validated) {
            const { email } = body
            const [ user ] = await getUser(email)

            if (user) {
                return res.status(201).json({
                    status: 'success',
                    message: 'You are logged in successfully',
                    data: []
                })
            }
            req.user = user
            req.password = password
            next()
        }
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
            data: []
        })
    }
}

const getWeatherReport = async(req, res, next) => {
    try {
        const { body, params: {id} } = req

        if (id) {
            const [user] = await getUserById(id)
            if (!user) {
                return res.status(401).json({
                    status: 'failed',
                    message: 'User does not exist'
                })
            }

            const { city, country } = body
            const weather = await fetchWeather(city, country)
            
            req.weather = weather.data
            req.user_id = id
            next()
        }
        
    }
    catch (error) {
        return res.status(404).json({
            status: 'failed',
            message: error.message
        })
    }
}

module.exports = {
    checkIfUserRegister,
    checkIfUserExistForLogin,
    getWeatherReport
}