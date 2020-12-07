const express = require('express')
const router = express.Router()

const { getRestaurants } = require('../../controllers/api/adminController')

router.get('/', (req, res) => {
  res.redirect('/api/admin/restaurants')
})

// restaurants
router.get('/restaurants', getRestaurants)

module.exports = router
