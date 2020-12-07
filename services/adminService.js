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

module.exports = {
  getRestaurants
}
