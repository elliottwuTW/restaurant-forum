const passport = require('passport')

const helpers = require('../_helpers')

const authenticated = (req, res, next) => {
  if (!helpers.ensureAuthenticated(req)) {
    return res.redirect('/signin')
  }
  next()
}

const isAdmin = (req, res, next) => {
  if (!helpers.getUser(req).isAdmin) {
    return res.redirect('/')
  }
  next()
}

const apiAuthenticated = passport.authenticate('jwt', { session: false })

const apiIsAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return next()
  } else {
    return res.status(401).json({
      success: false,
      message: '權限不足'
    })
  }
}

module.exports = {
  authenticated,
  isAdmin,
  apiAuthenticated,
  apiIsAdmin
}
