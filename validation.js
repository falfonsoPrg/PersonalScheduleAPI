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

const taskValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(1).required(),
        description: Joi.string().min(1).required(),
        start_date:Joi.date().required(),
        end_date:Joi.date().required(),
        send_email:Joi.boolean().required(),
        send_cellphone:Joi.boolean().required()
    })
    return schema.validate(data)
}

const tagValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
        color: Joi.string().min(1).required()
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.taskValidation = taskValidation
module.exports.tagValidation = tagValidation