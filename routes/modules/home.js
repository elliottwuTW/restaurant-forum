const express = require('express')
const router = express.Router()

const { getRestaurants } = require('../../controllers/restController')
const { signUpPage, signUp } = require('../../controllers/userController')

router.get('/', (req, res) => res.redirect('/restaurants'))
router.get('/restaurants', getRestaurants)

router.get('/signup', signUpPage)
router.post('/signup', signUp)

module.exports = router
