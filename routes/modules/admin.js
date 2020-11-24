const express = require('express')
const router = express.Router()

const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  postRestaurant
} = require('../../controllers/adminController')

const { authenticated, isAdmin } = require('../../middleware/auth')

router.use(authenticated)
router.use(isAdmin)

router.get('/', (req, res) => {
  res.redirect('/admin/restaurants')
})

router.get('/restaurants', getRestaurants)
router.get('/restaurants/:id', getRestaurant)
router.get('/restaurants/create', createRestaurant)
router.post('/restaurants', postRestaurant)

module.exports = router
