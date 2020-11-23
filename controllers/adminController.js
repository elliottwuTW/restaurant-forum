const getRestaurants = (req, res) => {
  res.render('admin/restaurants') // can't put a '/' before admin
}

module.exports = {
  getRestaurants
}
