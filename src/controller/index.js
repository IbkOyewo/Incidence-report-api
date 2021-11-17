const {createUser, validatePassword, updatePassword } = require('../services')

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
        const { user, body:{password} } = req
       
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

const forgotPassword = async(req, res, next) => {
    try {
        const {token} = req
        res.status(200).json({
            status: 'success',
            message: 'Use this token to reset your password',
            data: token
        })
        
    } catch (error) {
        next(error)
        
    }
}

const resetPassword = async(req, res, next) => {
    try {
        const user = await updatePassword(req)
        res.status(200).json({
            status: 'success',
            message: 'Password reset successful',
            data: user
        })
        
    } catch (error) {
        next(error)
        
    }
}


module.exports = { createNewUser, loginUser, forgotPassword, resetPassword }