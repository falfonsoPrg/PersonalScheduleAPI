const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = Schema({
    name: String,
    color: String
})

const TaskSchema = Schema({
    title: String,
    description: String,
    start_date:{ type:Date },
    end_date:{ type:Date },
    send_email:Boolean,
    send_cellphone:Boolean,
    tags:[TagSchema]
})

const UserSchema = Schema({
    user_type: Number,
    first_name: String,
    last_name: String,
    password: String,
    email: String,
    cellphone: String,
    created_at:{ type: Date, default: Date.now },
    verified_at:{ type:Date, default: null},
    last_login:{ type:Date, default: null},
    tasks:[TaskSchema]
})

module.exports = mongoose.model('User',UserSchema)
