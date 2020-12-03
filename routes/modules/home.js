const express = require('express')
const router = express.Router()

const passport = require('passport')

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const {
  getRestaurants,
  getRestaurant,
  getFeeds
} = require('../../controllers/restController')
const {
  signUpPage,
  signUp,
  signInPage,
  signIn,
  logout,
  getUser,
  editUser,
  putUser
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

// comments
router.post('/comments', authenticated, postComment)
router.delete('/comments/:id', authenticated, isAdmin, deleteComment)

// users
router.get('/users/:id', authenticated, getUser)
router.get('/users/:id/edit', authenticated, editUser)
router.put('/users/:id', authenticated, upload.single('image'), putUser)

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
