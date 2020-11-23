const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

const signUpPage = (req, res) => {
  return res.render('signup')
}

const signUp = (req, res) => {
  // hash password
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(req.body.password, salt))
    .then((hash) => {
      req.body.password = hash
      User.create(req.body)
        .then(() => res.redirect('/signin'))
        .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))
}

module.exports = {
  signUpPage,
  signUp
}
