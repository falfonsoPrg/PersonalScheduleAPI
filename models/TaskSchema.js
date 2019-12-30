const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = require('./TagSchema')

const TaskSchema = Schema({
    title: {type: String, unique: true},
    description: String,
    start_date:{ type:Date },
    end_date:{ type:Date },
    send_email:Boolean,
    send_cellphone:Boolean,
    tags:[TagSchema]
})

module.exports = TaskSchema