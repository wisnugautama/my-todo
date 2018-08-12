const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
}, {
    timestamps: true
})

var User = mongoose.model('User', userSchema)

module.exports = User