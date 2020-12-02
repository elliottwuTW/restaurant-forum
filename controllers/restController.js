const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const Comment = db.Comment
const User = db.User

const getRestaurants = async (req, res) => {
  const reqQuery = {}
  const validFields = ['page', 'categoryId']
  const removeFields = ['page']
  for (const key of Object.keys(req.query)) {
    if (!validFields.includes(key)) {
      req.flash('error_messages', '查詢條件有誤')
      return res.redirect('/restaurants')
    }
    if (req.query[key] && !removeFields.includes(key)) {
      // Foreign key
      if (key === 'categoryId') {
        reqQuery.CategoryId = req.query.categoryId
      } else {
        reqQuery[key] = req.query[key]
      }
    }
  }

  // Pagination setting
  const pageLimit = 10
  const page = Number(req.query.page) || 1
  const offset = (page - 1) * pageLimit

  const result = await Restaurant.findAndCountAll({
    raw: true,
    nest: true,
    include: { model: Category, attributes: ['name'] },
    where: reqQuery,
    offset,
    limit: pageLimit
  })
  // reconstruct data for render
  const restaurants = result.rows.map((restaurant) => ({
    ...restaurant,
    description: restaurant.description.substring(0, 50)
  }))

  // Pagination parameters for render
  const pages = Math.ceil(result.count / pageLimit)
  const totalPage = Array.from({ length: pages }).map((_, index) => index + 1)
  const prev = page - 1 < 1 ? 1 : page - 1
  const next = page + 1 > pages ? pages : page + 1

  const categories = await Category.findAll({ raw: true, nest: true })
  return res.render('restaurants', {
    restaurants,
    categories,
    categoryId: reqQuery.CategoryId ? reqQuery.CategoryId : '',
    totalPage,
    prev,
    next,
    pages
  })
}

const getRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id, {
    include: [
      Category,
      {
        model: Comment,
        include: [User]
      }
    ]
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
