const express = require('express')
const router = express.Router()

const apiHome = require('./modules/apiHome')
const apiAdmin = require('./modules/apiAdmin')

router.use('/', apiHome)
router.use('/admin', apiAdmin)

module.exports = router
