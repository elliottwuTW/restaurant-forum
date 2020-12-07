const { Restaurant, Category } = require('../../models')

// Get all restaurants
const getRestaurants = async (req, res) => {
  const restaurants = await Restaurant.findAll({
    raw: true,
    nest: true,
    order: [['updatedAt', 'DESC']],
    include: { model: Category, attributes: ['name'] }
  })
  return res.json({ restaurants })
}

module.exports = {
  getRestaurants
}
