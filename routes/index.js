const { getRestaurants } = require('../controllers/restController')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.redirect('/restaurants')
  })

  app.get('/restaurants', getRestaurants)
}
