const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const admin = require('./modules/admin')

router.use('/', home)
router.use('/admin', admin)

module.exports = router
