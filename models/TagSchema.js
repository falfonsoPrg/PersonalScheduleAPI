const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = Schema({
    name: {type: String, unique: true},
    color: String
})

module.exports = TagSchema
