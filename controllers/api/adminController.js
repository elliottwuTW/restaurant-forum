const { Restaurant, Category } = require('../../models')

// controller service
const adminService = require('../../services/adminService')

// Get all restaurants
const getRestaurants = async (req, res) => {
  adminService.getRestaurants(req, res, (data) => {
    return res.json(data)
  })
}

module.exports = {
  getRestaurants
}
