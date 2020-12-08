const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const {
  getRestaurants,
  getRestaurant,
  postRestaurant,
  updateRestaurant,
  deleteRestaurant
} = require('../../controllers/api/adminController')

const {
  getCategories,
  createCategory,
  putCategory,
  deleteCategory
} = require('../../controllers/api/categoryController')

const { apiAuthenticated, apiIsAdmin } = require('../../middleware/auth')

router.get('/', (req, res) => {
  res.redirect('/api/admin/restaurants')
})

router.use(apiAuthenticated)
router.use(apiIsAdmin)

// restaurants
router.get('/restaurants', getRestaurants)
router.get('/restaurants/:id', getRestaurant)
router.post('/restaurants', upload.single('image'), postRestaurant)
router.put('/restaurants/:id', upload.single('image'), updateRestaurant)
router.delete('/restaurants/:id', deleteRestaurant)

// categories
router.get('/categories', getCategories)
router.get('/categories/:id', getCategories)
router.post('/categories', createCategory)
router.put('/categories/:id', putCategory)
router.delete('/categories/:id', deleteCategory)

module.exports = router
