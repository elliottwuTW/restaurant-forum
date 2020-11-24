const db = require('../models')
const Restaurant = db.Restaurant

// Get all restaurants
const getRestaurants = (req, res) => {
  Restaurant.findAll({
    raw: true,
    nested: true
  }).then((restaurants) => res.render('admin/restaurants', { restaurants })) // can't put a '/' before admin
}

// New restaurant page
const createRestaurant = (req, res) => {
  return res.render('admin/create')
}

// Create an restaurant
const postRestaurant = (req, res) => {
  // check restaurant name
  if (!req.body.name) {
    req.flash('error_messages', '請填入餐廳名稱')
    return res.redirect('back')
  }

  Restaurant.create(req.body).then((restaurant) => {
    req.flash('success_messages', '餐廳建立成功')
    res.redirect('/admin/restaurants')
  })
}

// Read a specific restaurant
const getRestaurant = (req, res) => {
  Restaurant.findByPk(req.params.id)
    .then((restaurant) => {
      return res.render('admin/restaurant', { restaurant: restaurant.toJSON() })
    })
    .catch((err) => console.error(err))
}

module.exports = {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  postRestaurant
}
