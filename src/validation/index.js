const Joi = require('joi')

const createUserSchema = {
    schema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
    }),
    message: 'Error creating user'
}

const loginUserSchema = {
    schema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
}

const createIncidentSchema = {
    schema: Joi.object().keys({
        incident_description: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required()
    }),
    message: 'Error creating incident report'
}

module.exports = { createUserSchema, loginUserSchema, createIncidentSchema }