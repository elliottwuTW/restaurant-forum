const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const getRestaurants = async (req, res) => {
  let restaurants = await Restaurant.findAll({
    raw: true,
    nest: true,
    include: { model: Category, attributes: ['name'] }
  })
  // reconstruct data for render
  restaurants = restaurants.map((restaurant) => ({
    ...restaurant,
    description: restaurant.description.substring(0, 50)
  }))
  return res.render('restaurants', { restaurants })
}

const getRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id, {
    include: { model: Category, attributes: ['name'] }
  })
  if (!restaurant) {
    req.flash('error_messages', '餐廳中無此 id')
    return res.redirect('back')
  }

  return res.render('restaurant', { restaurant: restaurant.toJSON() })
}

module.exports = {
  getRestaurants,
  getRestaurant
}
