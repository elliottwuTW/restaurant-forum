const express = require('express')
const router = express.Router()

const passport = require('passport')

const { getRestaurants } = require('../../controllers/restController')
const {
  signUpPage,
  signUp,
  signInPage,
  signIn,
  logout
} = require('../../controllers/userController')
const { authenticated } = require('../../controllers/authController')

router.get('/', (req, res) => res.redirect('/restaurants'))
router.get('/restaurants', authenticated, getRestaurants)

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
