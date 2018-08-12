const User = require('../models/user');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
    const { email, password } = req.body
    User.findOne({
        email: email
    })
        .then((data_user) => {
            if (data_user) {
                let check_pass = bcrypt.compareSync(password, data_user.password);
                if (check_pass) {
                    let token = jwt.sign( { id: data_user._id, username: data_user.username, email: data_user.email }, 'smbvabvlue')
                    res.status(200).json({
                        message: `Successfully login`,
                        token
                    })
                } 
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