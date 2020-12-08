const express = require('express')
const router = express.Router()

const { signin, signUp } = require('../../controllers/api/userController')

router.post('/signin', signin)
router.post('/signup', signUp)

module.exports = router
