// controller service
const adminService = require('../../services/adminService')

const getRestaurants = async (req, res) => {
  adminService.getRestaurants(req, res, (data) => {
    return res.json(data)
  })
}

const getRestaurant = async (req, res) => {
  adminService.getRestaurant(req, res, (data) => {
    return res.json(data)
  })
}

module.exports = {
  getRestaurants,
  getRestaurant
}
