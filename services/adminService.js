const { Restaurant, Category } = require('../models')

const imgurUpload = require('../utils/imgurUpload')

// error handle method
const {
  allValidationError,
  errorMsgToArray
} = require('../utils/errorHandleHelper')

// Get all restaurants
const getRestaurants = async (req, res, callback) => {
  const restaurants = await Restaurant.findAll({
    raw: true,
    nest: true,
    order: [['updatedAt', 'DESC']],
    include: { model: Category, attributes: ['name'] }
  })
  // execute callback function
  callback({ restaurants })
}

// Read a specific restaurant
const getRestaurant = async (req, res, callback) => {
  const restaurant = await Restaurant.findByPk(req.params.id, {
    include: { model: Category, attributes: ['name'] }
  })
  callback({ restaurant: restaurant.toJSON() })
}

// Create an restaurant
const postRestaurant = async (req, res, callback) => {
  // check if file exists in req
  const { file } = req
  try {
    let restaurant = {}
    if (file) {
      const img = await imgurUpload(file)
      restaurant = await Restaurant.create({
        ...req.body,
        image: img.data.link,
        // Foreign key
        CategoryId: req.body.CategoryId
      })
    } else {
      restaurant = await Restaurant.create({
        ...req.body,
        image: null,
        CategoryId: req.body.CategoryId
      })
    }
    callback({ success: true, message: '餐廳建立成功', data: restaurant })
  } catch (err) {
    if (allValidationError(err.errors)) {
      const validationErrorMsg = errorMsgToArray(err.message)
      callback({
        success: false,
        message: validationErrorMsg,
        data: {}
      })
    } else {
      console.error(err)
    }
  }
}

// Update a specific restaurant
const updateRestaurant = async (req, res, callback) => {
  const { file } = req
  try {
    const restaurant = await Restaurant.findByPk(req.params.id)
    if (!restaurant) {
      callback({ success: false, message: '餐廳中無此 id', data: {} })
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
    callback({ success: true, message: '餐廳資料更新成功', data: restaurant })
  } catch (err) {
    if (allValidationError(err.errors)) {
      const validationErrorMsg = errorMsgToArray(err.message)
      callback({ success: false, message: validationErrorMsg, data: {} })
    } else {
      console.error(err)
    }
  }
}

// Delete a specific restaurant
const deleteRestaurant = async (req, res, callback) => {
  await Restaurant.destroy({ where: { id: req.params.id } })
  callback({ success: true, data: {} })
}

module.exports = {
  getRestaurants,
  getRestaurant,
  postRestaurant,
  updateRestaurant,
  deleteRestaurant
}
