const db = require('../models')
const Restaurant = db.Restaurant

// Get all restaurants
const getRestaurants = (req, res) => {
  Restaurant.findAll({
    raw: true,
    nested: true
  }).then((restaurants) => res.render('admin/restaurants', { restaurants })) // can't put a '/' before admin)
}

module.exports = {
  getRestaurants
}
