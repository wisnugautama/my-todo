const User = require('../models/user');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = (req,res) => {
    const { name, email, password } = req.body
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
                    let token = jwt.sign( { id: data_user._id, email: data_user.email }, 'smbvabvlue')
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

const loginfb = (req,res) => {
    let url_user_info = `https://graph.facebook.com/me?fields=id,name,email&access_token=${req.body.accessToken}`
    axios.get(url_user_info)
    .then((data_userFB) => {
        // console.log(data_userFB.data);
        User.findOne({
            email: data_userFB.data.email
        })
            .then((data_user) => {
                // console.log(data_user);
                
                // console.log(data_userFB.data);  
                if (data_user == null) {
                    User.create({
                        name: data_userFB.data.name,
                        email: data_userFB.data.email,
                        password: `${data_userFB.data.id}xxx`
                    })
                    .then((new_user) => {
                        // console.log(new_user);
                        let token = jwt.sign( { id: new_user._id, email: new_user.email }, 'smbvabvlue')
                        res.status(201).json({
                            message: `successfully registered`,
                            token
                        })
                    })
                    .catch((err) => {
                        res.status(400).json({
                            message: err.message
                        })
                    })
                }else {
                    let token = jwt.sign( { id: data_user._id, email: data_user.email }, 'smbvabvlue')
                    res.status(200).json({
                        message: `login successfully`,
                        token
                    })
                }
            })
            .catch((err) => {
                // console.log(err);
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