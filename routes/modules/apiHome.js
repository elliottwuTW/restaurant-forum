const express = require('express')
const router = express.Router()

const { signin } = require('../../controllers/api/userController')

router.post('/signin', signin)

module.exports = router
