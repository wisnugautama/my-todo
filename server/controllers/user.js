const User = require('../models/user');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const register = (req,res) => {
    const { name, email, username, password } = req.body
    User.findOne({
        email: email
    })
        .then((data_user) => {
            if (data_user) {
                res.status(400).json({
                    message: `User already Exist`
                })
            }else {
                User.create({
                    name: name,
                    email: email,
                    username: username,
                    password: password
                })
                    .then(() => {
                        res.status(201).json({
                            message: `User successfully created!`
                        })
                    })
                    .catch((err) => {
                        res.status(400).json({
                            message: err.message
                        })
                    })
            }
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        })
}

const login = (req,res) => {
    const { email } = req.body
    User.findOne({
        email: email
    })
        .then((data_user) => {
            let token = jwt.sign( { id: data_user._id, username: data_user.username, email: data_user.email }, 'smbvabvlue')
            if (data_user) {
                res.status(200).json({
                    message: `User Successfully logged in`,
                    token: token
                })
            }
        })
        .catch((err) => {
            res.status(400).json({
                message: `Username or / password wrong`
            })
        })

}

module.exports = {
    register,
    login
}