const express = require('express')
const router = express.Router()

const passport = require('passport')

const {
  getRestaurants,
  getRestaurant
} = require('../../controllers/restController')
const {
  signUpPage,
  signUp,
  signInPage,
  signIn,
  logout
} = require('../../controllers/userController')

const {
  postComment,
  deleteComment
} = require('../../controllers/commentController')

const { authenticated, isAdmin } = require('../../middleware/auth')

router.get('/', (req, res) => res.redirect('/restaurants'))
router.get('/restaurants', authenticated, getRestaurants)
router.get('/restaurants/:id', authenticated, getRestaurant)

router.post('/comments', authenticated, postComment)
router.delete('/comments/:id', authenticated, isAdmin, deleteComment)

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
