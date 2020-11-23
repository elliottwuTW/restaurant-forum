const express = require('express')
const router = express.Router()

const { getRestaurants } = require('../../controllers/adminController')

router.get('/', (req, res) => {
  res.redirect('/admin/restaurants')
})

router.get('/restaurants', getRestaurants)

module.exports = router
