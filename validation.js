const Joi = require('@hapi/joi')

const registerValidation = (data) => {
    const schema = Joi.object({
        user_type: Joi.string().required(),
        first_name: Joi.string().min(2).required(),
        last_name: Joi.string().min(2).required(),
        password: Joi.string().min(6).required(),
        email: Joi.string().min(6).email().required(),
        cellphone: Joi.string().min(10).required()
    })
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        password: Joi.string().min(6).required(),
        email: Joi.string().min(6).email().required()
    })
    return schema.validate(data)
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation