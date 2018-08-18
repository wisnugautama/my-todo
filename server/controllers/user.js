const User = require('../models/user');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()

const register = (req,res) => {
    const { name, email, password } = req.body
    User.create({
        name: name,
        email: email,
        password: password
    })
        .then((data_user) => {
            res.status(201).json({
                message: `User Successfully created`,
                data: data_user
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: `Email is already Exist`
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
                    let token = jwt.sign( { id: data_user._id, email: data_user.email }, process.env.jwt_secret)
                    res.status(200).json({
                        message: `Successfully login`,
                        token
                    })
                }else {
                    res.status(400).json({
                        message: `Username or Password Incorrect`
                    })  
                } 
            }else {
                res.status(400).json({
                    message: `Username or Password Incorrect`
                })
            }
            
        })
        .catch((err) => {
            res.status(400).json({
                message: `hola`
            })
        })

}

const loginfb = (req,res) => {
    let url_user_info = `https://graph.facebook.com/me?fields=id,name,email&access_token=${req.body.accessToken}`
    axios.get(url_user_info)
    .then((data_userFB) => {
        User.findOne({
            email: data_userFB.data.email
        })
            .then((data_user) => { 
                if (data_user == null) {
                    User.create({
                        name: data_userFB.data.name,
                        email: data_userFB.data.email,
                        password: data_userFB.data.id
                    })
                    .then((new_user) => {
                        console.log(new_user);
                        
                        let token = jwt.sign( { id: new_user._id, email: new_user.email }, process.env.jwt_secret)
                        res.status(201).json({
                            message: `successfully registered`,
                            token
                        })
                    })
                    .catch((err) => {
                        console.log('create --->>>>>', err);
                        
                        res.status(400).json({
                            message: err.message
                        })
                    })
                }else {
                    let token = jwt.sign( { id: data_user._id, email: data_user.email }, process.env.jwt_secret)
                    res.status(200).json({
                        message: `login successfully`,
                        token
                    })
                }
            })
            .catch((err) => {
                res.status(400).json({
                    message: err.message
                })
            })
    })
}

module.exports = {
    register,
    login,
    loginfb
}