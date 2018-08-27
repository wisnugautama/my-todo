const router = require('express').Router()
const { getWeather } = require('../controllers/weather')

router.post('/:city', getWeather)

module.exports = router