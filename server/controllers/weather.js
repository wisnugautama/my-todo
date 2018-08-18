const axios = require('axios')
require('dotenv').config()

const getWeather = (req,res) => {
    const city = req.params.city
    axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${process.env.weather_token}`)
    .then(function(response){
        res.status(200).json({
            data: response.data.data
        })
    })
    .catch(function(err){
        res.status(400).json({
            message: err.message
        })
    })
}

module.exports = { 
    getWeather
}