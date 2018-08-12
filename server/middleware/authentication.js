const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authentication = (req, res, next) => {
    let token = req.headers.token
    if (token) {
        var decoded = jwt.verify(token, 'smbvabvlue')
        User.findOne({
            email: decoded.email
        })
            .then((data_user) => {
                if (data_user) {
                    next()
                } else {
                    res.status(401).json({
                        message: `User not Authenticated`
                    })
                }
            })
            .catch((err) => {
                res.status(400).json({
                    message: err.message
                })
            })
    }else {
        res.status(400).json({
            message: `no token`
        })
    }
}

module.exports = {
    authentication
}