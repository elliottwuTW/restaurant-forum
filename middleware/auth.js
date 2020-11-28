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

module.exports = {
  authenticated,
  isAdmin
}
