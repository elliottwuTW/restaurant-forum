const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const getRestaurants = async (req, res) => {
  const reqQuery = {}
  const validFields = ['categoryId']
  for (const key of Object.keys(req.query)) {
    if (!validFields.includes(key)) {
      req.flash('error_messages', '查詢條件有誤')
      return res.redirect('/restaurants')
    }
    if (req.query[key]) {
      // Foreign key
      if (key === 'categoryId') {
        reqQuery.CategoryId = req.query.categoryId
      } else {
        reqQuery[key] = req.query[key]
      }
    }
  }
  let restaurants = await Restaurant.findAll({
    raw: true,
    nest: true,
    include: { model: Category, attributes: ['name'] },
    where: reqQuery
  })
  // reconstruct data for render
  restaurants = restaurants.map((restaurant) => ({
    ...restaurant,
    description: restaurant.description.substring(0, 50)
  }))
  const categories = await Category.findAll({ raw: true, nest: true })
  return res.render('restaurants', {
    restaurants,
    categories,
    categoryId: reqQuery.CategoryId ? reqQuery.CategoryId : ''
  })
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
