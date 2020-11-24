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

// Create a restaurant
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

module.exports = {
  getRestaurants,
  createRestaurant,
  postRestaurant
}
