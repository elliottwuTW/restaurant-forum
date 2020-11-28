const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  postRestaurant,
  editRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getUsers,
  putUsers
} = require('../../controllers/adminController')

const { authenticated, isAdmin } = require('../../middleware/auth')

router.use(authenticated)
router.use(isAdmin)

router.get('/', (req, res) => {
  res.redirect('/admin/restaurants')
})

// restaurants
router.get('/restaurants', getRestaurants)
router.get('/restaurants/create', createRestaurant)
router.get('/restaurants/:id/edit', editRestaurant)
router.get('/restaurants/:id', getRestaurant)
router.post('/restaurants', upload.single('image'), postRestaurant)
router.put('/restaurants/:id', upload.single('image'), updateRestaurant)
router.delete('/restaurants/:id', deleteRestaurant)

// users
router.get('/users', getUsers)
router.put('/users/:id/toggleAdmin', putUsers)

module.exports = router
