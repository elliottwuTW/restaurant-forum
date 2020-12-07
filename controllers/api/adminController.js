// controller service
const adminService = require('../../services/adminService')

const getRestaurants = async (req, res) => {
  adminService.getRestaurants(req, res, (result) => {
    return res.json(result)
  })
}

const getRestaurant = async (req, res) => {
  adminService.getRestaurant(req, res, (result) => {
    return res.json(result)
  })
}

const postRestaurant = async (req, res) => {
  adminService.postRestaurant(req, res, (result) => {
    return res.json(result)
  })
}

const deleteRestaurant = async (req, res) => {
  adminService.deleteRestaurant(req, res, (result) => {
    return res.json(result)
  })
}

module.exports = {
  getRestaurants,
  getRestaurant,
  postRestaurant,
  deleteRestaurant
}
