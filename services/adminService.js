const { Restaurant, Category } = require('../models')

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

module.exports = {
  getRestaurants,
  getRestaurant
}
