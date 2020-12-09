const {
  User,
  Comment,
  Restaurant,
  Favorite,
  Like,
  Followship
} = require('../models')

const _helpers = require('../_helpers')

// error handle method
const {
  allValidationError,
  errorMsgToArray
} = require('../utils/errorHandleHelper')

const imgurUpload = require('../utils/imgurUpload')

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
  const user = (await checkUserAndReturn(req, res)).toJSON()
  const commentedResIds = user.Comments.map((comment) => comment.RestaurantId)
  const duplicateCommentIndex = []
  // filter out the duplicate comment to the same restaurant
  commentedResIds.forEach((comment, index, commentArr) => {
    if (commentArr.indexOf(comment) !== index) duplicateCommentIndex.push(index)
  })

  user.Comments = user.Comments.filter(
    (_, index) => !duplicateCommentIndex.includes(index)
  )
  return res.render('user', { displayUser: user })
}

const editUser = async (req, res) => {
  const user = await checkUserAndReturn(req, res)
  if (user.id !== _helpers.getUser(req).id) {
    return res.redirect('back')
  }
  return res.render('userEdit', { displayUser: user.toJSON() })
}

const putUser = async (req, res) => {
  const { file } = req
  try {
    const user = await checkUserAndReturn(req, res)
    if (file) {
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

const addFavorite = async (req, res) => {
  const restaurant = await checkRestaurantAndReturn(req, res)
  await Favorite.create({
    UserId: _helpers.getUser(req).id,
    RestaurantId: restaurant.id
  })
  return res.redirect('back')
}

const removeFavorite = async (req, res) => {
  const restaurant = await checkRestaurantAndReturn(req, res)
  const favorite = await Favorite.findOne({
    where: {
      UserId: _helpers.getUser(req).id,
      RestaurantId: restaurant.id
    }
  })
  if (!favorite) {
    req.flash('error_messages', '無此 id 收藏紀錄')
    return res.redirect('back')
  }

  await favorite.destroy()
  return res.redirect('back')
}

const addLike = async (req, res) => {
  const restaurant = await checkRestaurantAndReturn(req, res)

  await Like.create({
    UserId: _helpers.getUser(req).id,
    RestaurantId: restaurant.id
  })
  return res.redirect('back')
}

const removeLike = async (req, res) => {
  const restaurant = await checkRestaurantAndReturn(req, res)

  const like = await Like.findOne({
    where: {
      UserId: _helpers.getUser(req).id,
      RestaurantId: restaurant.id
    }
  })
  if (!like) {
    req.flash('error_messages', '無此 id 按讚紀錄')
    return res.redirect('back')
  }

  await like.destroy()
  return res.redirect('back')
}

const getTopUser = async (req, res) => {
  let users = await User.findAll({
    // raw: true,
    // nest: true,
    include: [{ model: User, as: 'Followers' }]
  })
  const followingIds = _helpers
    .getUser(req)
    .Followings.map((following) => following.id)
  // add isFollowed by this user
  users = users.map((user) => ({
    // ...user
    ...user.dataValues,
    isFollowed: followingIds.includes(user.id)
  }))
  // sorted by followers number
  const compareFun = (a, b) => b.Followers.length - a.Followers.length
  users = users.sort(compareFun)

  return res.render('topUser', { users })
}

const addFollowing = async (req, res) => {
  const user = await checkUserAndReturn(req, res)
  if (user.id === _helpers.getUser(req).id) {
    req.flash('error_messages', '使用者不能自行追蹤')
    return res.redirect('back')
  }
  await Followship.create({
    followerId: _helpers.getUser(req).id,
    followingId: user.id
  })
  return res.redirect('back')
}

const removeFollowing = async (req, res) => {
  const user = await checkUserAndReturn(req, res)
  const followship = await Followship.findOne({
    where: { followerId: _helpers.getUser(req).id, followingId: user.id }
  })
  if (!followship) {
    req.flash('error_messages', '無此 id 追蹤紀錄')
    return res.redirect('back')
  }
  await followship.destroy()
  return res.redirect('back')
}

const checkUserAndReturn = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Comment,
        include: [Restaurant]
      },
      {
        model: Restaurant,
        as: 'FavoritedRestaurants'
      },
      {
        model: User,
        as: 'Followers'
      },
      {
        model: User,
        as: 'Followings'
      }
    ]
  })
  if (!user) {
    req.flash('error_messages', '無此使用者 id')
    return res.redirect(`/users/${_helpers.getUser(req).id}`)
  }
  return user
}

const checkRestaurantAndReturn = async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id)
  if (!restaurant) {
    req.flash('error_messages', '無此餐廳 id')
    return res.redirect('back')
  }
  return restaurant
}

module.exports = {
  signUpPage,
  signUp,
  signInPage,
  signIn,
  logout,
  getUser,
  editUser,
  putUser,
  addFavorite,
  removeFavorite,
  addLike,
  removeLike,
  getTopUser,
  addFollowing,
  removeFollowing
}
