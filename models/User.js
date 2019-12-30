const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TaskSchema = require('./TaskSchema')

const UserSchema = Schema({
    user_type: Number,
    first_name: String,
    last_name: String,
    password: String,
    email: {type:String},
    cellphone: String,
    created_at:{ type: Date, default: Date.now },
    verified_at:{ type:Date, default: null},
    last_login:{ type:Date, default: null},
    tasks:[TaskSchema]
})

module.exports = mongoose.model('User',UserSchema)
