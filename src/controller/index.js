const {createUser, validatePassword } = require('../services')

const createNewUser = async(req, res, next) => {
    try {
        const { body } = req
        const newUser  = await createUser(body)
        const { password, ...user } = newUser

        res.status(201).json({
            status: 'success',
            message: `User created successfully`,
            data: user
        })
    } 
    catch (error) {
        next(error)
    }
}

const loginUser = async(req, res, next) => {
    try {
        const { user, password } = req
       
        const validated = await validatePassword(user, password)

        if (!validated) {
            res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials',
                data: 'Error logging in user'
            })
        } else {
            res.status(201).json({
                status: 'success',
                message: 'User logged in successfully',
                data: validated
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { createNewUser, loginUser }