const authenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/signin')
  }
  next()
}

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.redirect('/')
  }
  next()
}

module.exports = {
  authenticated,
  isAdmin
}
