const axios = require('axios')

const getWeather = (req,res) => {
    const { city } = req.body
    axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=a8f4de2dfdd3484facfd003131fd619c`)
    .then(function(response){
        res.status(200).json({
            data: response.data
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