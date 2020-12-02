const db = require('../models')
const User = db.User
const imgur = require('imgur-node-api')

// error handle method
const {
  allValidationError,
  errorMsgToArray
} = require('../utils/errorHandleHelper')

const imgurUpload = require('../utils/imgurUpload')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

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
  return res.redirect('/restaurants')
}

const logout = (req, res) => {
  req.flash('success_messages', '登出成功')
  req.logout()
  return res.redirect('/signin')
}

const getUser = async (req, res) => {
  const user = await checkUserAndReturn(req, res)
  return res.render('user', { displayUser: user.toJSON() })
}

const editUser = async (req, res) => {
  const user = await checkUserAndReturn(req, res)
  return res.render('userEdit', { displayUser: user.toJSON() })
}

const putUser = async (req, res) => {
  const { file } = req
  try {
    const user = await checkUserAndReturn(req, res)
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      const img = await imgurUpload(file)
      await user.update({
        name: req.body.name,
        image: img.data.link
      })
    } else {
      await user.update({
        name: req.body.name,
        image: user.image
      })
    }
    req.flash('success_messages', '個人檔案更新成功')
    return res.redirect(`/users/${user.id}`)
  } catch (err) {
    console.error(err)
  }
}

const checkUserAndReturn = async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (!user) {
    req.flash('error_messages', '無此使用者 id')
    return res.redirect(`/users/${req.user.id}`)
  }
  return user
}

module.exports = {
  signUpPage,
  signUp,
  signInPage,
  signIn,
  logout,
  getUser,
  editUser,
  putUser
}
