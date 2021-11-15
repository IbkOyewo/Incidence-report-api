const {createUser, validateUserLogin } = require('../services/index')

const createNewUser = async (req, res, next) => {
    try {
        const { body } = req
        const newUser = await createUser(body)

        res.status(201).json({
            status: 'success',
            message: `User created successfully`,
            data: newUser
        })
    } 
    catch (error) {
        return next(error)
    }
}

const loginUser = async(req, res, next) => {
    try {
        const { email, password } = req
        const validated = await validateUserLogin(email, password)

        res.status(201).json({
            status: 'success',
            message: `User logged in successfully`,
            data: validated
        })
    } catch (error) {
        res.status(401).json({
            status: 'fail',
            message: error.message
        })
    }
    next()
}

module.exports = { createNewUser, loginUser }

