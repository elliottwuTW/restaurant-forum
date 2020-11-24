const express = require('express')
const router = express.Router()

const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  postRestaurant,
  editRestaurant,
  updateRestaurant
} = require('../../controllers/adminController')

const { authenticated, isAdmin } = require('../../middleware/auth')

router.use(authenticated)
router.use(isAdmin)

router.get('/', (req, res) => {
  res.redirect('/admin/restaurants')
})

router.get('/restaurants', getRestaurants)
router.get('/restaurants/create', createRestaurant)
router.get('/restaurants/:id/edit', editRestaurant)
router.get('/restaurants/:id', getRestaurant)
router.post('/restaurants', postRestaurant)
router.put('/restaurants/:id', updateRestaurant)

module.exports = router
