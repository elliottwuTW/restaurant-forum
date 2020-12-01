const db = require('../models')
const User = db.User

// error handle method
const {
  allValidationError,
  errorMsgToArray
} = require('../utils/errorHandleHelper')

const signUpPage = (req, res) => {
  return res.render('signup')
}

const signUp = async (req, res) => {
  // password check
  if (req.body.password !== req.body.passwordCheck) {
    const validationErrorMsg = ['密碼不同']
    return res.render('signup', { user: req.body, validationErrorMsg })
  }
  // check user
  const user = await User.findOne({ where: { email: req.body.email } })
  if (user) {
    const validationErrorMsg = ['email 已註冊']
    return res.render('signup', { user: req.body, validationErrorMsg })
  }
  try {
    await User.create(req.body)
    req.flash('success_messages', '註冊成功')
    return res.redirect('/signin')
  } catch (err) {
    if (allValidationError(err.errors)) {
      const validationErrorMsg = errorMsgToArray(err.message)
      return res.render('signup', { user: req.body, validationErrorMsg })
    } else {
      console.error(err)
    }
  }
}

const signInPage = (req, res) => {
  return res.render('signin')
}

// sign in successfully
const signIn = (req, res) => {
  req.flash('success_messages', '登入成功')
  if (req.user.isAdmin) {
    return res.redirect('/admin/restaurants')
  } else {
    return res.redirect('/restaurants')
  }
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
