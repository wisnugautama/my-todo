const router = require('express').Router()
const { getWeather } = require('../controllers/weather')

router.post('/', getWeather)

module.exports = router