const express = require('express')
const router = express.Router()

const { getRestaurants } = require('../../controllers/restController')

router.get('/', (req, res) => {
  res.redirect('/restaurants')
})

router.get('/restaurants', getRestaurants)

module.exports = router
