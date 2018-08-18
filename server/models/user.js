const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

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
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

userSchema.pre("save", function(next) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(this.password, salt);
    this.password = hash
    next()
})


var User = mongoose.model('User', userSchema)

module.exports = User