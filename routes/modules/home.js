const express = require('express')
const router = express.Router()

const passport = require('passport')

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const {
  getRestaurants,
  getRestaurant,
  getFeeds,
  getDashboard
} = require('../../controllers/restController')
const {
  signUpPage,
  signUp,
  signInPage,
  signIn,
  logout,
  getUser,
  editUser,
  putUser,
  addFavorite,
  removeFavorite,
  addLike,
  removeLike,
  getTopUser,
  addFollowing,
  removeFollowing
} = require('../../controllers/userController')

const {
  postComment,
  deleteComment
} = require('../../controllers/commentController')

const { authenticated, isAdmin } = require('../../middleware/auth')

// restaurants
router.get('/', (req, res) => res.redirect('/restaurants'))
router.get('/restaurants', authenticated, getRestaurants)
router.get('/restaurants/feeds', authenticated, getFeeds)
router.get('/restaurants/:id', authenticated, getRestaurant)
router.get('/restaurants/:id/dashboard', authenticated, getDashboard)

// comments
router.post('/comments', authenticated, postComment)
router.delete('/comments/:id', authenticated, isAdmin, deleteComment)

// users
router.get('/users/top', authenticated, getTopUser)
router.get('/users/:id', authenticated, getUser)
router.get('/users/:id/edit', authenticated, editUser)
router.put('/users/:id', authenticated, upload.single('image'), putUser)

// favorite
router.post('/favorite/:id', authenticated, addFavorite)
router.delete('/favorite/:id', authenticated, removeFavorite)

// like
router.post('/like/:id', authenticated, addLike)
router.delete('/like/:id', authenticated, removeLike)

// followship
router.post('/following/:id', authenticated, addFollowing)
router.delete('/following/:id', authenticated, removeFollowing)

// signup/signin/logout
router.get('/signup', signUpPage)
router.post('/signup', signUp)

router.get('/signin', signInPage)
router.post(
  '/signin',
  passport.authenticate('local', {
    failureRedirect: '/signin',
    failureFlash: true
  }),
  signIn
)

router.get('/logout', logout)

module.exports = router
