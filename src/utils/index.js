const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//Encrypt user password
const hashPassword = async password => {
    const encryptedPassword = await bcrypt.hash(password, 10)
    return encryptedPassword
}


const comparePassword = async(password, userPassword) => {
    const isValid = await bcrypt.compare(password, userPassword)
    return isValid
}

const generateToken = async user => {
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.TOKEN_KEY,
        {
        expiresIn: "2h",
        }
    )
    return token
}

const generateResetToken = async user => {
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.RESET_TOKEN_KEY,
        {
        expiresIn: "1h",
        }
    )
    return token
}


const validateToken = async (token, type) => {
    try{
        return jwt.verify(token, type === 'logged-in' ? process.env.TOKEN_KEY: process.env.RESET_TOKEN_KEY)
    } catch(error){
            return error
    }   
}

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    validateToken,
    generateResetToken
}