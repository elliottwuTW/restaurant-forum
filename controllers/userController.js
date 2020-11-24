const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

const signUpPage = (req, res) => {
  return res.render('signup')
}

const signUp = (req, res) => {
  // password check
  if (req.body.password !== req.body.passwordCheck) {
    req.flash('error_messages', '密碼不同')
    return res.redirect('/signup')
  }

  // check user
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      req.flash('error_messages', 'email 已註冊')
      return res.redirect('/signup')
    }
    // hash password
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(req.body.password, salt))
      .then((hash) => {
        req.body.password = hash
        User.create(req.body)
          .then(() => {
            req.flash('suceess_messages', '註冊成功')
            return res.redirect('/signin')
          })
          .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))
  })
}

const signInPage = (req, res) => {
  return res.render('signin')
}

// sign in successfully
const signIn = (req, res) => {
  req.flash('success_messages', '登入成功')
  return res.redirect('/restaurants')
}

const logout = (req, res) => {
  req.flash('success_messages', '登出成功')
  req.logout()
  return res.redirect('/signin')
}

module.exports = {
  signUpPage,
  signUp,
  signInPage,
  signIn,
  logout
}
