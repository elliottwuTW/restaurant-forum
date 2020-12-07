const express = require('express')
const router = express.Router()

const {
  getRestaurants,
  getRestaurant
} = require('../../controllers/api/adminController')

const { getCategories } = require('../../controllers/api/categoryController')

router.get('/', (req, res) => {
  res.redirect('/api/admin/restaurants')
})

// restaurants
router.get('/restaurants', getRestaurants)
router.get('/restaurants/:id', getRestaurant)

// categories
router.get('/categories', getCategories)
router.get('/categories/:id', getCategories)

module.exports = router
