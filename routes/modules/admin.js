const express = require('express')
const router = express.Router()

const { getRestaurants } = require('../../controllers/adminController')
const { authenticated, isAdmin } = require('../../controllers/authController')

router.use(authenticated)
router.use(isAdmin)

router.get('/', (req, res) => {
  res.redirect('/admin/restaurants')
})

router.get('/restaurants', getRestaurants)

module.exports = router
