const { User, Restaurant, Category } = require('../models')

const adminService = require('../services/adminService')

const imgurUpload = require('../utils/imgurUpload')

// error handle method
const {
  allValidationError,
  errorMsgToArray
} = require('../utils/errorHandleHelper')

// Get all restaurants
const getRestaurants = async (req, res) => {
  adminService.getRestaurants(req, res, (data) => {
    return res.render('admin/restaurants', data)
  })
}

// New restaurant page
const createRestaurant = async (req, res) => {
  const categories = await Category.findAll({ raw: true, nest: true })
  return res.render('admin/create', { categories })
}

// Create an restaurant
const postRestaurant = async (req, res) => {
  // check if file exists in req
  const { file } = req
  try {
    if (file) {
      const img = await imgurUpload(file)
      await Restaurant.create({
        ...req.body,
        image: img.data.link,
        // Foreign key
        CategoryId: req.body.CategoryId
      })
    } else {
      await Restaurant.create({
        ...req.body,
        image: null,
        CategoryId: req.body.CategoryId
      })
    }
    req.flash('success_messages', '餐廳建立成功')
    return res.redirect('/admin/restaurants')
  } catch (err) {
    if (allValidationError(err.errors)) {
      const validationErrorMsg = errorMsgToArray(err.message)
      const categories = await Category.findAll({ raw: true, nest: true })
      return res.render('admin/create', {
        restaurant: req.body,
        categories,
        validationErrorMsg
      })
    } else {
      console.error(err)
    }
  }
}

// Read a specific restaurant
const getRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id, {
    include: { model: Category, attributes: ['name'] }
  })
  return res.render('admin/restaurant', { restaurant: restaurant.toJSON() })
}

// Edit restaurant page
const editRestaurant = async (req, res) => {
  const categories = await Category.findAll({ raw: true, nest: true })
  const restaurant = await Restaurant.findByPk(req.params.id)
  return res.render('admin/edit', {
    restaurant: restaurant.toJSON(),
    categories
  })
}

// Update a specific restaurant
const updateRestaurant = async (req, res) => {
  const { file } = req
  try {
    const restaurant = await Restaurant.findByPk(req.params.id)
    if (!restaurant) {
      req.flash('error_messages', '餐廳中無此 id')
      return res.redirect('back')
    }

    if (file) {
      const img = await imgurUpload(file)
      await restaurant.update({
        ...req.body,
        image: img.data.link
      })
    } else {
      await restaurant.update({
        ...req.body,
        image: restaurant.image
      })
    }
    req.flash('success_messages', '餐廳資料更新成功')
    return res.redirect('/admin/restaurants')
  } catch (err) {
    if (allValidationError(err.errors)) {
      const validationErrorMsg = errorMsgToArray(err.message)
      const categories = await Category.findAll({ raw: true, nest: true })
      return res.render('admin/edit', {
        restaurant: { id: req.params.id, ...req.body },
        categories,
        validationErrorMsg
      })
    } else {
      console.error(err)
    }
  }
}

// Delete a specific restaurant
const deleteRestaurant = async (req, res) => {
  await Restaurant.destroy({ where: { id: req.params.id } })
  return res.redirect('/admin/restaurants')
}

// Get all users
const getUsers = async (req, res) => {
  const users = await User.findAll({ raw: true, nested: true })
  return res.render('admin/users', { users })
}

// Update user authority
const putUsers = async (req, res) => {
  const user = await User.findByPk(req.params.id)
  user.isAdmin = !user.isAdmin
  req.flash(
    'success_messages',
    `${user.name} 權限更改成功，目前為 ${user.isAdmin ? 'admin' : 'user'}`
  )
  await user.save()
  return res.redirect('/admin/users')
}

module.exports = {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  postRestaurant,
  editRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getUsers,
  putUsers
}
